import { createId } from "../../../../lib/create-id";
import { createTimeoutPromise } from "../../../../lib/fakeFetch";
import { getLocalStorageItem, setLocalStorageItem } from "../../../../lib/local-storage-helpers";
import { LocalStorageKeys } from "../../lib/consts";
import { Knowledge } from "../../types";
import { CreateKnowledgeRequestBody } from "./create-knowledge-dto";

export const createKnowledgeService = async (data: CreateKnowledgeRequestBody) => {
    const knowledges = getLocalStorageItem<Knowledge[]>(LocalStorageKeys.Knowledges) ?? [];

    const newKnowledge = { ...data, id: createId() };
    
    knowledges?.push(newKnowledge);
    setLocalStorageItem(LocalStorageKeys.Knowledges, knowledges);

    const res = await createTimeoutPromise(newKnowledge);

    return res;
}