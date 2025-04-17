import { DocApi } from '@/api/docApi';
import { TPostResponse, TPostDetailResponse } from '@/constants/TDocsPost';
import { TPost } from '@/interface/TPost';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { QueryKeys } from '@/constants';


type UsePostOptions = Omit<UseQueryOptions<TPost<TPostDetailResponse>>, 'queryKey' | 'queryFn'>;



export const usePostDetail = (post_id: string, options?: UsePostOptions) => {
    return useQuery<TPost<TPostDetailResponse>>({
        ...options,
        queryKey: [QueryKeys.POST_DETAIL, post_id],
        queryFn: () => DocApi.getAllPostDetail(post_id),
        enabled: !!post_id
    });
};

