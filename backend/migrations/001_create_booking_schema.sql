CREATE TABLE IF NOT EXISTS booking_options (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(80) NOT NULL,
    name VARCHAR(120) NOT NULL,
    description TEXT NULL,
    base_price DECIMAL(10, 2) NULL,
    currency CHAR(3) NOT NULL DEFAULT 'EUR',
    duration_hours DECIMAL(4, 2) NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    sort_order SMALLINT UNSIGNED NOT NULL DEFAULT 100,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_booking_options_slug (slug),
    INDEX idx_booking_options_active_sort (is_active, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS availability (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    availability_date DATE NOT NULL,
    status ENUM('available', 'blocked') NOT NULL DEFAULT 'available',
    reason VARCHAR(160) NULL,
    note TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_availability_date (availability_date),
    INDEX idx_availability_month_status (availability_date, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS bookings (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    booking_option_id INT UNSIGNED NULL,
    public_reference CHAR(12) NOT NULL,
    client_name VARCHAR(120) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    client_phone VARCHAR(40) NOT NULL,
    company_name VARCHAR(160) NULL,
    event_type VARCHAR(80) NOT NULL,
    event_date DATE NOT NULL,
    event_start_time TIME NULL,
    event_end_time TIME NULL,
    venue_name VARCHAR(160) NULL,
    venue_address VARCHAR(255) NULL,
    city VARCHAR(120) NOT NULL,
    country VARCHAR(120) NOT NULL DEFAULT 'Serbia',
    guest_count SMALLINT UNSIGNED NULL,
    budget_range VARCHAR(80) NULL,
    message TEXT NULL,
    status ENUM('pending', 'confirmed', 'cancelled') NOT NULL DEFAULT 'pending',
    admin_notes TEXT NULL,
    client_ip VARCHAR(45) NULL,
    user_agent VARCHAR(255) NULL,
    confirmed_at TIMESTAMP NULL DEFAULT NULL,
    cancelled_at TIMESTAMP NULL DEFAULT NULL,
    confirmation_sent_at TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    active_event_date DATE GENERATED ALWAYS AS (
        CASE
            WHEN deleted_at IS NULL AND status IN ('pending', 'confirmed') THEN event_date
            ELSE NULL
        END
    ) STORED,
    UNIQUE KEY uk_bookings_public_reference (public_reference),
    UNIQUE KEY uk_bookings_active_event_date (active_event_date),
    INDEX idx_bookings_status_date (status, event_date),
    INDEX idx_bookings_client_email (client_email),
    INDEX idx_bookings_created_at (created_at),
    INDEX idx_bookings_option (booking_option_id),
    CONSTRAINT fk_bookings_booking_option
        FOREIGN KEY (booking_option_id) REFERENCES booking_options(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
