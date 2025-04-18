import { DocApi } from "@/api/docApi";
import { TReportPostResponse } from "@/constants";
import { TPost } from "@/interface/TApiDoc";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/constants";



type UseReprotPostOptions = Omit<UseQueryOptions<TPost<TReportPostResponse[]>>, `queryKey` | `queryFn`>;


export const useReprotPost = (options?: UseReprotPostOptions) => {
    return useQuery({
        ...options,
        queryKey: [QueryKeys.REPORT_POST],
        queryFn: () => DocApi.getAllReportPost(),
    });
};