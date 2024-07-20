import { useQuery } from "@tanstack/react-query";
import { getKnowledgesService } from "./get-knowledges-service";
import { LocalStorageKeys } from "../../lib/consts";

export const useGetKnowledges = () => {
    const result = useQuery({
        queryKey: [LocalStorageKeys.Knowledges],
        queryFn: () => getKnowledgesService(),
    });

    return result;
}