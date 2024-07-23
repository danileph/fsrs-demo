import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReviewKnowledgeRequestBody } from "./review-knowledge-dto";
import { updateKnowledgeService } from "./review-knowledge-service";
import { message } from "antd";
import { useEffect } from "react";
import { LocalStorageKeys } from "../../lib/consts";

export const useReviewKnowledge = () => {
    const result = useMutation({
        mutationFn: ({id, data, date} : {id: string, data: ReviewKnowledgeRequestBody, date?: Date}) => updateKnowledgeService(id, data, date),
    });
    const queryClient = useQueryClient();

    useEffect(() => {
        console.log(result);
    }, [result]);

    useEffect(() => {
        if (result.isError && result.error) {
            console.error(result.error);
            message.error("Произошла ошибка при повторение карточки");
        }
    }, [result.isError, result.error]);

    useEffect(() => {
        if (result.isSuccess) {
            message.success("Карточка успешно повторена");
        }
    }, [result.isSuccess]);

    useEffect(() => {
        if (result.isSuccess) {
            queryClient.invalidateQueries({ queryKey: [LocalStorageKeys.Knowledges] });
        }
    }, [result.isSuccess]);

    return result;
}