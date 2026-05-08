import { useEffect, useMemo, useState } from 'react';
import {
    clearAvailabilityOverride,
    getAdminBookings,
    getAdminCsrfToken,
    getCurrentAdmin,
    loginAdmin,
    logoutAdmin,
    setAvailabilityOverride,
    updateAdminBooking,
} from '../lib/api/admin';

const statusOptions = [
    { value: '', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'cancelled', label: 'Cancelled' },
];

const statusClasses = {
    pending: 'border-amber-400/30 bg-amber-400/10 text-amber-200',
    confirmed: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
    cancelled: 'border-red-400/30 bg-red-400/10 text-red-200',
};

function todayDate() {
    return new Date().toISOString().slice(0, 10);
}

function statusLabel(status) {
    return status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown';
}

function formatDate(date) {
    if (!date) return '-';

    return new Intl.DateTimeFormat('sr-Latn-RS', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(new Date(`${date}T00:00:00`));
}

function formatDateTime(date) {
    if (!date) return '-';

    return new Intl.DateTimeFormat('sr-Latn-RS', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(date.replace(' ', 'T')));
}

export default function AdminPage() {
    const [admin, setAdmin] = useState(null);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const [loginError, setLoginError] = useState('');

    const [filters, setFilters] = useState({
        status: 'pending',
        search: '',
        from: '',
        to: '',
        page: 1,
    });
    const [bookings, setBookings] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [isLoadingBookings, setIsLoadingBookings] = useState(false);
    const [bookingError, setBookingError] = useState('');

    const [availabilityForm, setAvailabilityForm] = useState({
        date: todayDate(),
        reason: 'manual_block',
        note: '',
    });
    const [availabilityStatus, setAvailabilityStatus] = useState('');

    const activeFilters = useMemo(() => ({
        status: filters.status || undefined,
        search: filters.search || undefined,
        from: filters.from || undefined,
        to: filters.to || undefined,
        page: filters.page,
        perPage: 20,
        sort: 'created_at',
        direction: 'desc',
    }), [filters]);

    useEffect(() => {
        async function checkSession() {
            try {
                const currentAdmin = await getCurrentAdmin();
                setAdmin(currentAdmin);
            } catch {
                setAdmin(null);
            } finally {
                setIsCheckingAuth(false);
            }
        }

        checkSession();
    }, []);

    useEffect(() => {
        if (!admin) return;

        async function loadBookings() {
            setIsLoadingBookings(true);
            setBookingError('');

            try {
                const result = await getAdminBookings(activeFilters);
                setBookings(result.items || []);
                setPagination(result.pagination || null);
            } catch (error) {
                setBookingError(error.message || 'Cannot load bookings.');
            } finally {
                setIsLoadingBookings(false);
            }
        }

        loadBookings();
    }, [activeFilters, admin]);

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        setLoginError('');

        try {
            await getAdminCsrfToken();
            const result = await loginAdmin(loginForm);
            setAdmin(result.admin);
        } catch (error) {
            setLoginError(error.message || 'Login failed.');
        }
    };

    const handleLogout = async () => {
        try {
            await logoutAdmin();
        } finally {
            sessionStorage.removeItem('ljusaitodos_csrf_token');
            setAdmin(null);
        }
    };

    const updateStatus = async (booking, status) => {
        setBookingError('');

        try {
            const updated = await updateAdminBooking(booking.id, {
                status,
                adminNotes: booking.admin_notes || '',
            });

            setBookings((items) => items
                .map((item) => (item.id === updated.id ? updated : item))
                .filter((item) => !filters.status || item.status === filters.status));
        } catch (error) {
            setBookingError(error.message || 'Status update failed.');
        }
    };

    const handleBlockDate = async (event) => {
        event.preventDefault();
        setAvailabilityStatus('Saving...');

        try {
            await setAvailabilityOverride(availabilityForm.date, {
                status: 'blocked',
                reason: availabilityForm.reason,
                note: availabilityForm.note,
            });
            setAvailabilityStatus('Date blocked.');
        } catch (error) {
            setAvailabilityStatus(error.message || 'Could not block date.');
        }
    };

    const handleReleaseDate = async () => {
        setAvailabilityStatus('Saving...');

        try {
            await clearAvailabilityOverride(availabilityForm.date);
            setAvailabilityStatus('Manual block removed.');
        } catch (error) {
            setAvailabilityStatus(error.message || 'Could not release date.');
        }
    };

    if (isCheckingAuth) {
        return (
            <main className="min-h-screen bg-background px-6 py-10 text-white">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/45">Checking session...</p>
            </main>
        );
    }

    if (!admin) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-background px-5 py-10 text-white">
                <form
                    onSubmit={handleLoginSubmit}
                    className="w-full max-w-md border border-white/10 bg-white/[0.02] p-6 md:p-8"
                >
                    <p className="text-[10px] uppercase tracking-[0.34em] text-white/40">XTY Admin</p>
                    <h1 className="mt-3 text-3xl font-heading font-bold uppercase tracking-tight">
                        Booking panel
                    </h1>

                    {loginError && (
                        <p className="mt-6 border border-red-400/20 bg-red-500/10 p-3 text-xs uppercase tracking-[0.18em] text-red-200">
                            {loginError}
                        </p>
                    )}

                    <div className="mt-8 grid gap-5">
                        <label className="grid gap-2 text-[10px] uppercase tracking-[0.24em] text-white/45">
                            Email
                            <input
                                type="email"
                                value={loginForm.email}
                                onChange={(event) => setLoginForm((form) => ({ ...form, email: event.target.value }))}
                                className="border-b border-white/15 bg-transparent py-3 text-sm normal-case tracking-normal text-white outline-none transition placeholder:text-white/25 focus:border-white/50"
                                placeholder="admin@xty-music.com"
                                required
                            />
                        </label>

                        <label className="grid gap-2 text-[10px] uppercase tracking-[0.24em] text-white/45">
                            Password
                            <input
                                type="password"
                                value={loginForm.password}
                                onChange={(event) => setLoginForm((form) => ({ ...form, password: event.target.value }))}
                                className="border-b border-white/15 bg-transparent py-3 text-sm normal-case tracking-normal text-white outline-none transition placeholder:text-white/25 focus:border-white/50"
                                placeholder="Password"
                                required
                            />
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="mt-8 w-full bg-white px-5 py-4 text-[10px] font-black uppercase tracking-[0.28em] text-black transition hover:bg-white/85"
                    >
                        Login
                    </button>
                </form>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background px-4 py-6 text-white md:px-8 md:py-10">
            <div className="mx-auto grid max-w-7xl gap-6">
                <header className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.34em] text-white/40">XTY Admin</p>
                        <h1 className="mt-2 text-3xl font-heading font-bold uppercase tracking-tight md:text-5xl">
                            Booking panel
                        </h1>
                        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/45">
                            Logged in as {admin.email}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="border border-white/15 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-white/70 transition hover:border-white/40 hover:text-white"
                    >
                        Logout
                    </button>
                </header>

                <section className="grid gap-4 border border-white/10 bg-white/[0.02] p-4 md:grid-cols-[1fr_1fr_1fr_1fr_auto] md:items-end md:p-5">
                    <label className="grid gap-2 text-[10px] uppercase tracking-[0.2em] text-white/45">
                        Status
                        <select
                            value={filters.status}
                            onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value, page: 1 }))}
                            className="border border-white/10 bg-[#09090B] px-3 py-3 text-xs uppercase tracking-[0.16em] text-white outline-none"
                        >
                            {statusOptions.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </label>

                    <label className="grid gap-2 text-[10px] uppercase tracking-[0.2em] text-white/45">
                        Search
                        <input
                            value={filters.search}
                            onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value, page: 1 }))}
                            className="border border-white/10 bg-transparent px-3 py-3 text-xs normal-case tracking-normal text-white outline-none placeholder:text-white/25"
                            placeholder="Name, email, phone..."
                        />
                    </label>

                    <label className="grid gap-2 text-[10px] uppercase tracking-[0.2em] text-white/45">
                        From
                        <input
                            type="date"
                            value={filters.from}
                            onChange={(event) => setFilters((current) => ({ ...current, from: event.target.value, page: 1 }))}
                            className="border border-white/10 bg-transparent px-3 py-3 text-xs text-white outline-none"
                        />
                    </label>

                    <label className="grid gap-2 text-[10px] uppercase tracking-[0.2em] text-white/45">
                        To
                        <input
                            type="date"
                            value={filters.to}
                            onChange={(event) => setFilters((current) => ({ ...current, to: event.target.value, page: 1 }))}
                            className="border border-white/10 bg-transparent px-3 py-3 text-xs text-white outline-none"
                        />
                    </label>

                    <button
                        type="button"
                        onClick={() => setFilters({ status: 'pending', search: '', from: '', to: '', page: 1 })}
                        className="border border-white/15 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 transition hover:text-white"
                    >
                        Reset
                    </button>
                </section>

                <section className="grid gap-6 lg:grid-cols-[0.68fr_0.32fr]">
                    <div className="grid gap-4">
                        <div className="flex items-center justify-between gap-4">
                            <h2 className="text-lg font-heading font-bold uppercase tracking-tight">Requests</h2>
                            <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">
                                {pagination ? `${pagination.total} total` : 'Loading'}
                            </p>
                        </div>

                        {bookingError && (
                            <p className="border border-red-400/20 bg-red-500/10 p-3 text-xs uppercase tracking-[0.18em] text-red-200">
                                {bookingError}
                            </p>
                        )}

                        {isLoadingBookings ? (
                            <p className="border border-white/10 p-5 text-[10px] uppercase tracking-[0.24em] text-white/45">
                                Loading bookings...
                            </p>
                        ) : bookings.length === 0 ? (
                            <p className="border border-white/10 p-5 text-[10px] uppercase tracking-[0.24em] text-white/45">
                                No bookings for current filters.
                            </p>
                        ) : (
                            <div className="grid gap-3">
                                {bookings.map((booking) => (
                                    <article key={booking.id} className="border border-white/10 bg-white/[0.015] p-4">
                                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                            <div>
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/40">
                                                        {booking.public_reference}
                                                    </span>
                                                    <span className={`border px-2 py-1 text-[9px] uppercase tracking-[0.18em] ${statusClasses[booking.status] || 'border-white/15 text-white/50'}`}>
                                                        {statusLabel(booking.status)}
                                                    </span>
                                                </div>
                                                <h3 className="mt-3 text-xl font-heading font-semibold uppercase tracking-tight">
                                                    {booking.client_name}
                                                </h3>
                                                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/50">
                                                    {formatDate(booking.event_date)} / {booking.event_type} / {booking.city}
                                                </p>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => updateStatus(booking, 'confirmed')}
                                                    className="border border-emerald-300/25 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-200 transition hover:bg-emerald-400/10"
                                                >
                                                    Confirm
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => updateStatus(booking, 'pending')}
                                                    className="border border-amber-300/25 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-amber-200 transition hover:bg-amber-400/10"
                                                >
                                                    Pending
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => updateStatus(booking, 'cancelled')}
                                                    className="border border-red-300/25 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-red-200 transition hover:bg-red-400/10"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-4 grid gap-3 text-sm text-white/70 md:grid-cols-3">
                                            <p>{booking.client_email}</p>
                                            <p>{booking.client_phone}</p>
                                            <p>Created: {formatDateTime(booking.created_at)}</p>
                                        </div>

                                        {booking.message && (
                                            <p className="mt-4 whitespace-pre-line border-t border-white/5 pt-4 text-sm leading-relaxed text-white/55">
                                                {booking.message}
                                            </p>
                                        )}
                                    </article>
                                ))}
                            </div>
                        )}

                        {pagination && pagination.total_pages > 1 && (
                            <div className="flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    disabled={filters.page <= 1}
                                    onClick={() => setFilters((current) => ({ ...current, page: current.page - 1 }))}
                                    className="border border-white/15 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white/60 disabled:opacity-30"
                                >
                                    Prev
                                </button>
                                <span className="text-[10px] uppercase tracking-[0.2em] text-white/45">
                                    {pagination.current_page} / {pagination.total_pages}
                                </span>
                                <button
                                    type="button"
                                    disabled={filters.page >= pagination.total_pages}
                                    onClick={() => setFilters((current) => ({ ...current, page: current.page + 1 }))}
                                    className="border border-white/15 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white/60 disabled:opacity-30"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>

                    <aside className="h-fit border border-white/10 bg-white/[0.02] p-5 lg:sticky lg:top-6">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Availability</p>
                        <h2 className="mt-2 text-2xl font-heading font-bold uppercase tracking-tight">
                            Block date
                        </h2>

                        <form onSubmit={handleBlockDate} className="mt-6 grid gap-5">
                            <label className="grid gap-2 text-[10px] uppercase tracking-[0.2em] text-white/45">
                                Date
                                <input
                                    type="date"
                                    value={availabilityForm.date}
                                    onChange={(event) => setAvailabilityForm((form) => ({ ...form, date: event.target.value }))}
                                    className="border border-white/10 bg-transparent px-3 py-3 text-xs text-white outline-none"
                                    required
                                />
                            </label>

                            <label className="grid gap-2 text-[10px] uppercase tracking-[0.2em] text-white/45">
                                Reason
                                <input
                                    value={availabilityForm.reason}
                                    onChange={(event) => setAvailabilityForm((form) => ({ ...form, reason: event.target.value }))}
                                    className="border border-white/10 bg-transparent px-3 py-3 text-xs normal-case tracking-normal text-white outline-none placeholder:text-white/25"
                                    placeholder="private_event"
                                />
                            </label>

                            <label className="grid gap-2 text-[10px] uppercase tracking-[0.2em] text-white/45">
                                Note
                                <textarea
                                    value={availabilityForm.note}
                                    onChange={(event) => setAvailabilityForm((form) => ({ ...form, note: event.target.value }))}
                                    rows="4"
                                    className="resize-none border border-white/10 bg-transparent px-3 py-3 text-xs normal-case tracking-normal text-white outline-none placeholder:text-white/25"
                                    placeholder="Internal note..."
                                />
                            </label>

                            {availabilityStatus && (
                                <p className="text-[10px] uppercase tracking-[0.2em] text-white/55">
                                    {availabilityStatus}
                                </p>
                            )}

                            <div className="grid gap-3">
                                <button
                                    type="submit"
                                    className="bg-white px-5 py-4 text-[10px] font-black uppercase tracking-[0.24em] text-black transition hover:bg-white/85"
                                >
                                    Block date
                                </button>
                                <button
                                    type="button"
                                    onClick={handleReleaseDate}
                                    className="border border-white/15 px-5 py-4 text-[10px] font-bold uppercase tracking-[0.24em] text-white/65 transition hover:border-white/40 hover:text-white"
                                >
                                    Remove manual block
                                </button>
                            </div>
                        </form>
                    </aside>
                </section>
            </div>
        </main>
    );
}
