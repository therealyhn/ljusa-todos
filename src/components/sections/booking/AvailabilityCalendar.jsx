import { useEffect, useMemo, useState } from 'react';
import { getAvailability } from '../../../lib/api/booking';

const weekDays = ['Pon', 'Uto', 'Sre', 'Cet', 'Pet', 'Sub', 'Ned'];

function formatMonth(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function formatDate(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function monthLabel(date) {
    return new Intl.DateTimeFormat('sr-Latn-RS', {
        month: 'long',
        year: 'numeric',
    }).format(date);
}

function buildCalendarDays(monthDate, availabilityDays) {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const leadingBlanks = (firstDay.getDay() + 6) % 7;
    const daysByDate = new Map(availabilityDays.map((day) => [day.date, day]));
    const days = [];

    for (let index = 0; index < leadingBlanks; index += 1) {
        days.push(null);
    }

    for (let day = 1; day <= lastDay.getDate(); day += 1) {
        const date = new Date(year, month, day);
        const dateKey = formatDate(date);
        days.push({
            date: dateKey,
            day,
            status: daysByDate.get(dateKey)?.status || 'available',
            reason: daysByDate.get(dateKey)?.reason || null,
        });
    }

    return days;
}

export default function AvailabilityCalendar({ selectedDate, onSelectDate }) {
    const [visibleMonth, setVisibleMonth] = useState(() => {
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), 1);
    });
    const [availability, setAvailability] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const month = formatMonth(visibleMonth);

    useEffect(() => {
        let isMounted = true;

        async function loadAvailability() {
            setIsLoading(true);
            setError('');

            try {
                const response = await getAvailability(month);
                if (isMounted) {
                    setAvailability(response.data?.days || []);
                }
            } catch {
                if (isMounted) {
                    setAvailability([]);
                    setError('Kalendar trenutno nije dostupan.');
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }

        loadAvailability();

        return () => {
            isMounted = false;
        };
    }, [month]);

    const calendarDays = useMemo(
        () => buildCalendarDays(visibleMonth, availability),
        [visibleMonth, availability],
    );

    const goToPreviousMonth = () => {
        setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1));
    };

    return (
        <div className="border border-white/10 bg-white/[0.02] p-4 md:p-5">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-secondary/50 font-bold">
                        Dostupnost
                    </p>
                    <h4 className="mt-1 text-lg font-heading font-semibold uppercase tracking-tight text-white">
                        {monthLabel(visibleMonth)}
                    </h4>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={goToPreviousMonth}
                        className="border border-white/10 px-3 py-2 text-xs text-white/60 transition hover:border-white/30 hover:text-white"
                        aria-label="Prethodni mesec"
                    >
                        &lt;-
                    </button>
                    <button
                        type="button"
                        onClick={goToNextMonth}
                        className="border border-white/10 px-3 py-2 text-xs text-white/60 transition hover:border-white/30 hover:text-white"
                        aria-label="Sledeci mesec"
                    >
                        -&gt;
                    </button>
                </div>
            </div>

            <div className="mt-5 grid grid-cols-7 gap-1 text-center">
                {weekDays.map((day) => (
                    <div key={day} className="pb-2 text-[9px] uppercase tracking-[0.18em] text-white/35">
                        {day}
                    </div>
                ))}

                {calendarDays.map((day, index) => {
                    if (!day) {
                        return <div key={`blank-${index}`} className="aspect-square" />;
                    }

                    const isBlocked = day.status !== 'available';
                    const isSelected = selectedDate === day.date;

                    return (
                        <button
                            key={day.date}
                            type="button"
                            onClick={() => {
                                if (!isBlocked) {
                                    onSelectDate(day.date);
                                }
                            }}
                            disabled={isBlocked || isLoading}
                            title={isBlocked ? 'Datum nije dostupan' : 'Izaberi datum'}
                            className={`aspect-square border text-xs font-semibold transition ${
                                isSelected
                                    ? 'border-white bg-white text-black'
                                    : isBlocked
                                        ? 'cursor-not-allowed border-white/5 bg-white/[0.01] text-white/20 line-through'
                                        : 'border-white/10 bg-black/20 text-white hover:border-white/40 hover:bg-white/10'
                            }`}
                        >
                            {day.day}
                        </button>
                    );
                })}
            </div>

            <div className="mt-4 flex flex-wrap gap-3 text-[9px] uppercase tracking-[0.2em] text-white/45">
                <span className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 bg-white" />
                    Dostupno
                </span>
                <span className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 border border-white/20" />
                    Zauzeto
                </span>
                {selectedDate && <span className="text-white/75">Izabrano: {selectedDate}</span>}
            </div>

            {isLoading && (
                <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-white/45">
                    Ucitavamo dostupnost...
                </p>
            )}
            {error && (
                <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}
