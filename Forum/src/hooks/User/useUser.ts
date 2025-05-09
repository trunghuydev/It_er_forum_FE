import { DocApi } from "@/api";
import { QueryKeys } from "@/constants";
import { TApiDoc } from "@/interface/TApiDoc";
import { TUser } from "@/interface/TUser";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";




type UseUserOptions = Omit<UseQueryOptions<TApiDoc<TUser[]>>,`queryKey`|`queryFn`>;

export const UseUser =(options?:UseUserOptions) =>{
    return useQuery({
        ...options,
        queryKey:[QueryKeys.USER],
        queryFn:()=> DocApi.getAllUser(),
    })

}