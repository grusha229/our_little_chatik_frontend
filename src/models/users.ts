import { IChatsFilesLink, IChatsUploadFileLink } from './chats';

export interface ICurrentUserInfoResponse {
    avatar: string;
    email: string;
    name: string;
    nickname: string;
    surname: string;
    user_id: string;
}

export interface IUsersSearchPayload {
    nickname: string;
    limit?: number;
    page?: number;
}

export interface IUsersPatchCurrentUserPayload {
    avatar_upload_id: string;
    name: string;
    nickname: string;
    surname: string;
    email?: string;
}

export interface IUsersPatchCurrentUserResponse extends ICurrentUserInfoResponse {}
export type IUsersUploadAvatarLinkResponse = IChatsUploadFileLink;
export type IUsersUploadAvatarLinkPayload = IChatsFilesLink;

export type IUsersSearchResponse = Array<ICurrentUserInfoResponse>;
