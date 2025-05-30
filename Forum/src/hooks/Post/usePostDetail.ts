import { DocApi } from '@/api/docApi';
import { TPostResponse, TPostDetailResponse } from '@/constants/TDocsPost';
import { TPost } from '@/interface/TApiDoc';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { QueryKeys } from '@/constants';


type UsePostOptions = Omit<UseQueryOptions<TPost<TPostDetailResponse>>, 'queryKey' | 'queryFn'>;



export const usePostDetail = (post_id: string, options?: UsePostOptions) => {
    return useQuery({
        ...options,
        queryKey: [QueryKeys.POST_DETAIL, post_id],
        queryFn: () => DocApi.getPostDetail(post_id),
        enabled: !!post_id
    });
};

