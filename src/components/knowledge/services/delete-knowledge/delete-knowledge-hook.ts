import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteKnowledgeService } from "./delete-knowledge-service";
import { useEffect } from "react";
import { message } from "antd";
import { LocalStorageKeys } from "../../lib/consts";

export const useDeleteKnowledge = () => {
    const result = useMutation({
        mutationFn: ({ id } : {id: string}) => deleteKnowledgeService(id),
    });
    const queryClient = useQueryClient();

    useEffect(() => {
        if (result.isError && result.error) {
            console.error(result.error);
            message.error("Произошла ошибка при удалении карточки");
        }
    }, [result.isError, result.error]);

    useEffect(() => {
        if (result.isSuccess) {
            message.success("Карточка успешно удалена");
        }
    }, [result.isSuccess]);

    useEffect(() => {
        if (result.isSuccess) {
            queryClient.invalidateQueries({ queryKey: [LocalStorageKeys.Knowledges] });
        }
    }, [result.isSuccess]);

    return result;
}