export type TApiDoc<T> = {
    is_success: boolean;
    status_code: number;
    message: string;
    data: T;
    timestamp: number;
}


