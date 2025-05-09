import { DocApi } from "@/api/docApi";
import { TCommentDetailResponse} from "@/constants/TComment";
import{ TApiDoc } from "@/interface/TApiDoc";
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { QueryKeys } from "@/constants";


type useCommentDetailOptions= Omit<UseQueryOptions<TApiDoc<TCommentDetailResponse>>,"queryKey"|"queryFn">

export const useCommentDetail =(report_id:string,options?:useCommentDetailOptions)=>{
    return useQuery({
        ...options,
        queryKey:[QueryKeys.COMMENT_DETAIL,report_id],
        queryFn:()=>DocApi.getCommentDetail(report_id),
        enabled:!!report_id
    })
}