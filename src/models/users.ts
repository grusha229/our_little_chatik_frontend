export interface ICurrentUserInfoResponse {
    avatar: string,
    email: string,
    name: string,
    nickname: string,
    surname: string,
    user_id: string
  }

export interface IUsersSearchPayload {
  nickname: string;
  limit?: number;
  page?: number;
}

export type IUsersSearchResponse = Array<ICurrentUserInfoResponse>