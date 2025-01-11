import { IChatsUser } from "../../../../models/chats";

export const getSenderById = (id: string, participants: any[]) : any | null => {
    const participant = participants.find((participant) => participant.participant_id === id);
    return participant || null;
}