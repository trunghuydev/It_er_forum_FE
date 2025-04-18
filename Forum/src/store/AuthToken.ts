import { create } from "zustand";

type AuthToken = {
    access_token: string | null;
    refresh_token: string | null;
    setTokens: (access_token: string, refresh_token: string) => void;
    clearTokens: () => void;
};

export const useAuthStore = create<AuthToken>((set) => ({
    access_token: null,
    refresh_token: null,


    setTokens: (access_token, refresh_token) =>
        set(() => ({
            access_token,
            refresh_token,
        })),


    clearTokens: () =>
        set(() => ({
            access_token: null,
            refresh_token: null,
        })),
}));
