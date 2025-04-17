import axiosClient from './AxiosClient';
import { TPost } from '@/interface/TPost';
import { TDocsPost, TDocsPostDetail } from '@/constants/TDocsPost';

export const DocApi = {

    getAllPost: async (): Promise<TPost<TDocsPost[]>> => {
        const url = `/posts/admin/dashboard`;
        const res = await axiosClient.get(url);
        return res.data
    },

    getAllPostDetail: async (post_id: string): Promise<TPost<TDocsPostDetail>> => {
        const url = `/posts/admin/dashboard/${post_id}`;
        const res = await axiosClient.get(url);
        return res.data

    }
};

