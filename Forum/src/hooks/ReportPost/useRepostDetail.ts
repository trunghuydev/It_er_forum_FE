import { DocApi } from "@/api/docApi";
import { TReportPostResponse } from "@/constants";
import { TPost } from "@/interface/TPost";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { QueryKeys } from "@/constants";

type UseRePortPostDEtail = Omit<UseQueryOptions<TPost<TReportPostResponse>>, `queryKey` | `queryFn`>;

export const useRepostDetail = (report_id: string, options?: UseRePortPostDEtail) => {
    return useQuery({
        ...options,
        queryKey: [QueryKeys.REPORT_POST_DETAIL],
        queryFn: () => DocApi.getAllReportPostDetail(report_id),
        enabled: !!report_id
    })
}