import { DocApi } from '@/api/docApi';
import { TPostResponse } from '@/constants/TDocsPost';
import { TApiDoc } from '@/interface/TApiDoc';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { QueryKeys } from '@/constants';


type UsePostOptions = Omit<UseQueryOptions<TApiDoc<TPostResponse[]>>, 'queryKey' | 'queryFn'>;



export const usePost = (options?: UsePostOptions) => {
    return useQuery({
        ...options,
        queryKey: [QueryKeys.POST],
        queryFn: () => DocApi.getAllPost(),
    });
};

