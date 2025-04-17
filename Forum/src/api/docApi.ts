import axiosClient from './AxiosClient';
import { TPost } from '@/interface/TPost';
import { TPostResponse, TPostDetailResponse, TReportPostResponse } from '@/constants/TDocsPost';

export const DocApi = {

    getAllPost: async (): Promise<TPost<TPostResponse[]>> => {
        const url = `/posts/admin/dashboard`
        const res = await axiosClient.get(url)
        return res.data
    },
    getAllPostDetail: async (post_id: string): Promise<TPost<TPostDetailResponse>> => {
        const url = `/posts/admin/dashboard/${post_id}`
        const res = await axiosClient.get(url)
        return res.data

    },

    getAllReportPost: async (): Promise<TPost<TReportPostResponse[]>> => {
        const url = `/report/admin/Post`
        const res = await axiosClient.get(url)
        return res.data
    },
    getAllReportPostDetail: async (report_id: string): Promise<TPost<TReportPostResponse>> => {
        const url = `/report/admin/detail/Post/${report_id}`
        const res = await axiosClient.get(url)
        return res.data
    },



};

