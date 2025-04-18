export const getSenderById = (id: string, participants: any[] | null = []): any | null => {
    const participant = participants?.find(participant => participant.participant_id === id);
    return participant || null;
};
