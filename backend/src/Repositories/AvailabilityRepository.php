<?php
declare(strict_types=1);

namespace Repositories;

final class AvailabilityRepository extends BaseRepository
{
    public function findOverridesBetween(string $startDate, string $endDate): array
    {
        $statement = $this->db->prepare(
            'SELECT availability_date, status, reason, note
             FROM availability
             WHERE availability_date BETWEEN ? AND ?
             ORDER BY availability_date ASC'
        );
        $statement->execute([$startDate, $endDate]);

        $rows = $statement->fetchAll();
        $byDate = [];

        foreach ($rows as $row) {
            $byDate[$row['availability_date']] = [
                'status' => $row['status'],
                'reason' => $row['reason'],
                'note' => $row['note'],
            ];
        }

        return $byDate;
    }

    public function findActiveBookingsBetween(string $startDate, string $endDate): array
    {
        $statement = $this->db->prepare(
            "SELECT event_date, status, public_reference
             FROM bookings
             WHERE deleted_at IS NULL
               AND status IN ('pending', 'confirmed')
               AND event_date BETWEEN ? AND ?
             ORDER BY event_date ASC"
        );
        $statement->execute([$startDate, $endDate]);

        $rows = $statement->fetchAll();
        $byDate = [];

        foreach ($rows as $row) {
            $byDate[$row['event_date']] = [
                'booking_status' => $row['status'],
                'public_reference' => $row['public_reference'],
            ];
        }

        return $byDate;
    }
}
