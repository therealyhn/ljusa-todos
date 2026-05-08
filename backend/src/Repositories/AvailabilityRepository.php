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

    public function upsertOverride(string $date, string $status, ?string $reason, ?string $note): array
    {
        $statement = $this->db->prepare(
            'INSERT INTO availability (availability_date, status, reason, note)
             VALUES (?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE
                status = VALUES(status),
                reason = VALUES(reason),
                note = VALUES(note)'
        );
        $statement->execute([$date, $status, $reason, $note]);

        return $this->findByDate($date) ?? [];
    }

    public function deleteOverride(string $date): bool
    {
        $statement = $this->db->prepare('DELETE FROM availability WHERE availability_date = ?');
        $statement->execute([$date]);

        return $statement->rowCount() > 0;
    }

    public function findByDate(string $date): ?array
    {
        $statement = $this->db->prepare(
            'SELECT availability_date, status, reason, note, created_at, updated_at
             FROM availability
             WHERE availability_date = ?
             LIMIT 1'
        );
        $statement->execute([$date]);

        $availability = $statement->fetch();

        return $availability ?: null;
    }
}
