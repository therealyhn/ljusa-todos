<?php
declare(strict_types=1);

namespace Repositories;

final class BookingRepository extends BaseRepository
{
    public function paginateForAdmin(array $filters): array
    {
        [$whereSql, $params] = $this->buildAdminWhere($filters);
        $sortColumns = [
            'created_at' => 'b.created_at',
            'event_date' => 'b.event_date',
            'status' => 'b.status',
        ];
        $sort = $sortColumns[$filters['sort']] ?? 'b.created_at';
        $direction = $filters['direction'] === 'asc' ? 'ASC' : 'DESC';
        $page = $filters['page'];
        $perPage = $filters['per_page'];
        $offset = ($page - 1) * $perPage;

        $countStatement = $this->db->prepare(
            "SELECT COUNT(*)
             FROM bookings b
             LEFT JOIN booking_options bo ON bo.id = b.booking_option_id
             {$whereSql}"
        );
        $countStatement->execute($params);
        $total = (int) $countStatement->fetchColumn();

        $statement = $this->db->prepare(
            "SELECT
                b.id,
                b.booking_option_id,
                bo.name AS booking_option_name,
                b.public_reference,
                b.client_name,
                b.client_email,
                b.client_phone,
                b.company_name,
                b.event_type,
                b.event_date,
                b.event_start_time,
                b.event_end_time,
                b.venue_name,
                b.venue_address,
                b.city,
                b.country,
                b.guest_count,
                b.budget_range,
                b.message,
                b.status,
                b.admin_notes,
                b.confirmed_at,
                b.cancelled_at,
                b.confirmation_sent_at,
                b.created_at,
                b.updated_at
             FROM bookings b
             LEFT JOIN booking_options bo ON bo.id = b.booking_option_id
             {$whereSql}
             ORDER BY {$sort} {$direction}, b.id DESC
             LIMIT :limit OFFSET :offset"
        );

        foreach ($params as $key => $value) {
            $statement->bindValue($key, $value);
        }

        $statement->bindValue(':limit', $perPage, \PDO::PARAM_INT);
        $statement->bindValue(':offset', $offset, \PDO::PARAM_INT);
        $statement->execute();

        return [
            'items' => $statement->fetchAll(),
            'pagination' => [
                'total' => $total,
                'per_page' => $perPage,
                'current_page' => $page,
                'total_pages' => (int) ceil($total / $perPage),
            ],
        ];
    }

    public function findActiveBookingByDate(string $eventDate): ?array
    {
        $statement = $this->db->prepare(
            "SELECT id, public_reference, status, event_date
             FROM bookings
             WHERE deleted_at IS NULL
               AND status IN ('pending', 'confirmed')
               AND event_date = ?
             LIMIT 1"
        );
        $statement->execute([$eventDate]);

        $booking = $statement->fetch();

        return $booking ?: null;
    }

    public function findBlockedAvailabilityByDate(string $eventDate): ?array
    {
        $statement = $this->db->prepare(
            "SELECT availability_date, status, reason, note
             FROM availability
             WHERE availability_date = ?
               AND status = 'blocked'
             LIMIT 1"
        );
        $statement->execute([$eventDate]);

        $availability = $statement->fetch();

        return $availability ?: null;
    }

    public function activeBookingOptionExists(int $bookingOptionId): bool
    {
        $statement = $this->db->prepare(
            'SELECT id
             FROM booking_options
             WHERE id = ?
               AND is_active = 1
             LIMIT 1'
        );
        $statement->execute([$bookingOptionId]);

        return (bool) $statement->fetch();
    }

    public function create(array $data): array
    {
        $statement = $this->db->prepare(
            'INSERT INTO bookings (
                booking_option_id,
                public_reference,
                client_name,
                client_email,
                client_phone,
                company_name,
                event_type,
                event_date,
                event_start_time,
                event_end_time,
                venue_name,
                venue_address,
                city,
                country,
                guest_count,
                budget_range,
                message,
                client_ip,
                user_agent
             ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        );

        $statement->execute([
            $data['booking_option_id'],
            $data['public_reference'],
            $data['client_name'],
            $data['client_email'],
            $data['client_phone'],
            $data['company_name'],
            $data['event_type'],
            $data['event_date'],
            $data['event_start_time'],
            $data['event_end_time'],
            $data['venue_name'],
            $data['venue_address'],
            $data['city'],
            $data['country'],
            $data['guest_count'],
            $data['budget_range'],
            $data['message'],
            $data['client_ip'],
            $data['user_agent'],
        ]);

        return $this->findById((int) $this->db->lastInsertId());
    }

    public function updateStatus(int $id, string $status, ?string $adminNotes): ?array
    {
        $statement = $this->db->prepare(
            "UPDATE bookings
             SET status = ?,
                 admin_notes = ?,
                 confirmed_at = CASE WHEN ? = 'confirmed' THEN NOW() ELSE confirmed_at END,
                 cancelled_at = CASE WHEN ? = 'cancelled' THEN NOW() ELSE cancelled_at END
             WHERE id = ?
               AND deleted_at IS NULL"
        );
        $statement->execute([$status, $adminNotes, $status, $status, $id]);

        if ($statement->rowCount() === 0) {
            return null;
        }

        return $this->findById($id);
    }

    public function markConfirmationSent(int $id): void
    {
        $statement = $this->db->prepare('UPDATE bookings SET confirmation_sent_at = NOW() WHERE id = ?');
        $statement->execute([$id]);
    }

    public function findById(int $id): array
    {
        $statement = $this->db->prepare(
            'SELECT
                id,
                booking_option_id,
                public_reference,
                client_name,
                client_email,
                client_phone,
                company_name,
                event_type,
                event_date,
                event_start_time,
                event_end_time,
                venue_name,
                venue_address,
                city,
                country,
                guest_count,
                budget_range,
                message,
                status,
                admin_notes,
                confirmed_at,
                cancelled_at,
                confirmation_sent_at,
                created_at,
                updated_at
             FROM bookings
             WHERE id = ?
             LIMIT 1'
        );
        $statement->execute([$id]);

        return $statement->fetch() ?: [];
    }

    private function buildAdminWhere(array $filters): array
    {
        $clauses = ['b.deleted_at IS NULL'];
        $params = [];

        if ($filters['status'] !== null) {
            $clauses[] = 'b.status = :status';
            $params[':status'] = $filters['status'];
        }

        if ($filters['from'] !== null) {
            $clauses[] = 'b.event_date >= :from_date';
            $params[':from_date'] = $filters['from'];
        }

        if ($filters['to'] !== null) {
            $clauses[] = 'b.event_date <= :to_date';
            $params[':to_date'] = $filters['to'];
        }

        if ($filters['search'] !== null) {
            $clauses[] = '(
                b.public_reference LIKE :search_reference
                OR b.client_name LIKE :search_name
                OR b.client_email LIKE :search_email
                OR b.client_phone LIKE :search_phone
            )';
            $search = '%' . $filters['search'] . '%';
            $params[':search_reference'] = $search;
            $params[':search_name'] = $search;
            $params[':search_email'] = $search;
            $params[':search_phone'] = $search;
        }

        return ['WHERE ' . implode(' AND ', $clauses), $params];
    }
}
