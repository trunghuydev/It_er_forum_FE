import axiosClient from './AxiosClient';
import { TApiDoc } from '@/interface/TApiDoc';
import { TPostResponse, TPostDetailResponse, TReportPostResponse } from '@/constants/TDocsPost';
import { Login, LoginResponse, LoginResponseTokenData } from '@/interface/Auth';
import { TCommentResponse } from '@/constants/TComment';

export const DocApi = {

    Login: async (body: Login): Promise<LoginResponse<LoginResponseTokenData>> => {
        const url = `/auth/login`
        const res = await axiosClient.post(url, body)
        return res.data
    },
    /*--------------------------------------Post---------------------------------------------------------------- */
    getAllPost: async (): Promise<TApiDoc<TPostResponse[]>> => {
        const url = `/posts/admin/dashboard`
        const res = await axiosClient.get(url)
        return res.data
    },
    getAllPostDetail: async (post_id: string): Promise<TApiDoc<TPostDetailResponse>> => {
        const url = `/posts/admin/dashboard/${post_id}`
        const res = await axiosClient.get(url)
        return res.data

    },
    /*--------------------------------------PostReport-------------------------------------------------------------- */
    getAllReportPost: async (): Promise<TApiDoc<TReportPostResponse[]>> => {
        const url = `/report/admin/Post`
        const res = await axiosClient.get(url)
        return res.data
    },
    getAllReportPostDetail: async (report_id: string): Promise<TApiDoc<TReportPostResponse>> => {
        const url = `/report/admin/detail/Post/${report_id}`
        const res = await axiosClient.get(url)
        return res.data
    },
    /*--------------------------------------CmttReport-------------------------------------------------------------- */
    getAllComment : async (): Promise<TApiDoc<TCommentResponse[]>>=>{
        const url = `/report/admin/Comment`
        const res = await axiosClient.get(url)
        return res.data
    },
    getAllcommentDetail : async (report_id: string): Promise<TApiDoc<TCommentResponse>>=>{
        const url = `/report/admin/detail/Comment/${report_id}`
        const res = await axiosClient.get(url)
        return res.data
    }



};

