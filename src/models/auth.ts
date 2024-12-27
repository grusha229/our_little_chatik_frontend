export interface IActivationPayload {
    code: string,
}

export interface IRefreshTokenPayload {
    refresh_token: string,
}

export interface IRefreshTokenResponse extends IRefreshTokenPayload {
    token: string,
}

export interface ILoginPayload {
    nickname: string,
    password: string,
}

export interface IRenewPasswordPayload {
    confirm_new_password: string,
    new_password: string,
    old_password: string
}

export interface ISignupPayload {
    email: string,
    name: string,
    surname: string,
    nickname: string,
    password: string,
}