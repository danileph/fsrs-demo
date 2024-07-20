import { createTimeoutPromise } from "../../../../lib/fakeFetch";
import { getLocalStorageItem, setLocalStorageItem } from "../../../../lib/local-storage-helpers";
import { LocalStorageKeys } from "../../lib/consts";
import { Knowledge } from "../../types";
import { UpdateKnowledgeRequestBody } from "./update-knowledge-dto";

export const updateKnowledgeService = async (id: string, data: UpdateKnowledgeRequestBody) => {
    const knowledges = getLocalStorageItem<Knowledge[]>(LocalStorageKeys.Knowledges);

    if (!knowledges) {
        return;
    }

    const knowledgeIndex = knowledges.findIndex(knowledge => knowledge.id === id);

    if (knowledgeIndex === -1) {
        return;
    }

    knowledges[knowledgeIndex] = { ...knowledges[knowledgeIndex], ...data };

    setLocalStorageItem(LocalStorageKeys.Knowledges, knowledges);

    const res = await createTimeoutPromise(knowledges[knowledgeIndex]);

    return res;
}