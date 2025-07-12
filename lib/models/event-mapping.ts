export interface EventParticipant {
    id: string;
    eventId: string;
    userId: string;
    status: 'interested' | 'confirmed' | 'cancelled';
    message?: string;
    joinedAt: string;
}