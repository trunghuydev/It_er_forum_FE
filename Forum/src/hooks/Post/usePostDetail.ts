import { DocPostApi } from '@/api/docApi';
import { TDocsPost, TDocsPostDetail } from '@/constants/TDocsPost';
import { TPost } from '@/interface/TPost';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { QueryKeys } from '@/constants';


type UsePostOptions = Omit<UseQueryOptions<TPost<TDocsPostDetail>>, 'queryKey' | 'queryFn'>;



export const usePostDetail = (post_id: string, options?: UsePostOptions) => {
    return useQuery<TPost<TDocsPostDetail>>({
        ...options,
        queryKey: [QueryKeys.POST_DETAIL, post_id],
        queryFn: () => DocPostApi.getAllPostDetail(post_id),
        enabled: !!post_id
    });
};

