import { DocApi } from '@/api/docApi';
import { TPostResponse } from '@/constants/TDocsPost';
import { TPost } from '@/interface/TPost';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { QueryKeys } from '@/constants';


type UsePostOptions = Omit<UseQueryOptions<TPost<TPostResponse[]>>, 'queryKey' | 'queryFn'>;



export const usePost = (options?: UsePostOptions) => {
    return useQuery({
        ...options,
        queryKey: [QueryKeys.POST],
        queryFn: () => DocApi.getAllPost(),
    });
};

