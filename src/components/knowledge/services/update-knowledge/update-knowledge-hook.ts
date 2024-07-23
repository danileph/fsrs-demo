import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateKnowledgeRequestBody } from "./update-knowledge-dto";
import { updateKnowledgeService } from "./update-knowledge-service";
import { message } from "antd";
import { useEffect } from "react";
import { LocalStorageKeys } from "../../lib/consts";

export const useUpdateKnowledge = () => {
    const result = useMutation({
        mutationFn: ({id, data, date} : {id: string, data: UpdateKnowledgeRequestBody, date?: Date}) => updateKnowledgeService(id, data, date),
    });
    const queryClient = useQueryClient();

    useEffect(() => {
        console.log(result);
    }, [result]);

    useEffect(() => {
        if (result.isError && result.error) {
            console.error(result.error);
            message.error("Произошла ошибка при изменении карточки");
        }
    }, [result.isError, result.error]);

    useEffect(() => {
        if (result.isSuccess) {
            message.success("Карточка успешно изменена");
        }
    }, [result.isSuccess]);

    useEffect(() => {
        if (result.isSuccess) {
            queryClient.invalidateQueries({ queryKey: [LocalStorageKeys.Knowledges] });
        }
    }, [result.isSuccess]);

    return result;
}