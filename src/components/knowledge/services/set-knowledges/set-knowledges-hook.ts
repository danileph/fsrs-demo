import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SetKnowledgesRequestBody } from "./set-knowledges-dto";
import { setKnowledgesService } from "./set-knowledges-service";
import { useEffect } from "react";
import { message } from "antd";
import { LocalStorageKeys } from "../../lib/consts";

export const useSetKnowledges = () => {
    const result = useMutation({
        mutationFn: ({data} : {data: SetKnowledgesRequestBody}) => setKnowledgesService(data),
    });
    const queryClient = useQueryClient();

    useEffect(() => {
        if (result.isError && result.error) {
            console.error(result.error);
            message.error("Произошла ошибка при попытки импортировать карточки!");
        }
    }, [result.isError, result.error]);

    useEffect(() => {
        if (result.isSuccess) {
            message.success("Карточки успешно импортированы!");
        }
    }, [result.isSuccess]);

    useEffect(() => {
        if (result.isSuccess) {
            queryClient.invalidateQueries({ queryKey: [LocalStorageKeys.Knowledges] });
        }
    }, [result.isSuccess]);

    return result;
}