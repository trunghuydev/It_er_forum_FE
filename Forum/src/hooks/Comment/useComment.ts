import { DocApi } from "@/api";
import { TCommentResponse } from "@/constants/TComment";
import { UseQueryOptions,useQuery } from "@tanstack/react-query";
import { QueryKeys  } from "@/constants";
import { TApiDoc } from "@/interface/TApiDoc";


type UseCommentOptions = Omit<UseQueryOptions<TApiDoc<TCommentResponse[]>>, "queryKey" | "queryFn">;

export const useComment = (options?: UseCommentOptions) => {
  return useQuery({
    ...options,
    queryKey: [QueryKeys.COMMENT],
    queryFn: () => DocApi.getAllComment(),
  });
};
