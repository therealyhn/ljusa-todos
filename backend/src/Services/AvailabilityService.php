<?php
declare(strict_types=1);

namespace Services;

use DateInterval;
use DatePeriod;
use DateTimeImmutable;
use DateTimeZone;
use Repositories\AvailabilityRepository;

final class AvailabilityService
{
    private AvailabilityRepository $repository;
    private DateTimeZone $timezone;

    public function __construct()
    {
        $this->repository = new AvailabilityRepository();
        $this->timezone = new DateTimeZone(defined('APP_TIMEZONE') ? APP_TIMEZONE : 'Europe/Belgrade');
    }

    public function getMonth(string $month): array
    {
        $start = DateTimeImmutable::createFromFormat('!Y-m-d', $month . '-01', $this->timezone);
        $end = $start->modify('last day of this month');
        $startDate = $start->format('Y-m-d');
        $endDate = $end->format('Y-m-d');

        $overrides = $this->repository->findOverridesBetween($startDate, $endDate);
        $bookings = $this->repository->findActiveBookingsBetween($startDate, $endDate);
        $today = new DateTimeImmutable('today', $this->timezone);
        $period = new DatePeriod($start, new DateInterval('P1D'), $end->modify('+1 day'));
        $days = [];

        foreach ($period as $date) {
            $dateKey = $date->format('Y-m-d');
            $day = [
                'date' => $dateKey,
                'status' => 'available',
                'source' => 'default',
                'reason' => null,
                'note' => null,
                'booking_status' => null,
            ];

            if ($date < $today) {
                $day['status'] = 'blocked';
                $day['source'] = 'past';
                $day['reason'] = 'past_date';
            }

            if (isset($overrides[$dateKey]) && $date >= $today) {
                $override = $overrides[$dateKey];
                $day['status'] = $override['status'];
                $day['source'] = 'availability';
                $day['reason'] = $override['reason'];
                $day['note'] = $override['note'];
            }

            if (isset($bookings[$dateKey])) {
                $day['status'] = 'blocked';
                $day['source'] = 'booking';
                $day['reason'] = 'booking_' . $bookings[$dateKey]['booking_status'];
                $day['booking_status'] = $bookings[$dateKey]['booking_status'];
            }

            $days[] = $day;
        }

        return [
            'month' => $month,
            'start_date' => $startDate,
            'end_date' => $endDate,
            'timezone' => $this->timezone->getName(),
            'days' => $days,
            'available_dates' => array_values(array_map(
                static fn (array $day): string => $day['date'],
                array_filter($days, static fn (array $day): bool => $day['status'] === 'available')
            )),
            'blocked_dates' => array_values(array_map(
                static fn (array $day): string => $day['date'],
                array_filter($days, static fn (array $day): bool => $day['status'] === 'blocked')
            )),
        ];
    }
}
