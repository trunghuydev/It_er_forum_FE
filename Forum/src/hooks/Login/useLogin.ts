import { useMutation } from '@tanstack/react-query';
import { DocApi } from '@/api';
import { Login, LoginResponse, LoginResponseTokenData } from '@/interface/Auth';
import { useAuthStore } from '@/store/AuthToken';

export const useLogin = () => {
    const setTokens = useAuthStore((state) => state.setTokens);

    return useMutation({
        mutationFn: (body: Login) => DocApi.Login(body),
        onSuccess: (response) => {
            const { access_token, refresh_token } = response.data;
            if (access_token && refresh_token) {
                setTokens(access_token, refresh_token);
                sessionStorage.setItem("accessToken", access_token);
                sessionStorage.setItem("refreshToken", refresh_token);
                console.log("Access_Token: ", access_token);

            }
        },
    });
};
