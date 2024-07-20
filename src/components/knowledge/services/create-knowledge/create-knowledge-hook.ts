import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateKnowledgeRequestBody } from "./create-knowledge-dto";
import { createKnowledgeService } from "./create-knowledge-service"
import { useEffect } from "react";
import { message } from "antd";
import { LocalStorageKeys } from "../../lib/consts";

export const useCreateKnowledge = () => {
    const result = useMutation({
        mutationFn: ({data} : {data: CreateKnowledgeRequestBody}) => createKnowledgeService(data),
    });
    const queryClient = useQueryClient();

    useEffect(() => {
        if (result.isError && result.error) {
            console.error(result.error);
            message.error("Произошла ошибка при создании карточки");
        }
    }, [result.isError, result.error]);

    useEffect(() => {
        if (result.isSuccess) {
            message.success("Карточка успешно создана");
        }
    }, [result.isSuccess]);

    useEffect(() => {
        if (result.isSuccess) {
            queryClient.invalidateQueries({ queryKey: [LocalStorageKeys.Knowledges] });
        }
    }, [result.isSuccess]);

    return result;
}