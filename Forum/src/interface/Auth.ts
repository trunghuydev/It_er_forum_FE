export type LoginResponse<T> = {
    is_success: boolean;
    status_code: number;
    message: string;
    data: T;
    timestamp: number;
}
export interface Login {
    email: string;
    password: string;
}

export interface LoginResponseTokenData {
    access_token: string;
    refresh_token: string;
}



