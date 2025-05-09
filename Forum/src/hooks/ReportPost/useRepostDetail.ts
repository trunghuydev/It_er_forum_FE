import { DocApi } from "@/api/docApi";
import { TReportPostResponse } from "@/constants";
import { TApiDoc } from "@/interface/TApiDoc";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { QueryKeys } from "@/constants";

type UseRePortPostDEtail = Omit<UseQueryOptions<TApiDoc<TReportPostResponse>>, `queryKey` | `queryFn`>;

export const useRepostDetail = (report_id: string, options?: UseRePortPostDEtail) => {
    return useQuery({
        ...options,
        queryKey: [QueryKeys.REPORT_POST_DETAIL],
        queryFn: () => DocApi.getReportPostDetail(report_id),
        enabled: !!report_id
    })
}