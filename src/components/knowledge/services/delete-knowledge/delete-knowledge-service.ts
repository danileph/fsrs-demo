import { createTimeoutPromise } from "../../../../lib/fakeFetch";
import { getLocalStorageItem, setLocalStorageItem } from "../../../../lib/local-storage-helpers";
import { LocalStorageKeys } from "../../lib/consts";
import { Knowledge } from "../../types";

export const deleteKnowledgeService = async (id: string) => {
    const knowledges = getLocalStorageItem<Knowledge[]>(LocalStorageKeys.Knowledges);

    if (!knowledges) {
        return;
    }

    const knowledgeIndex = knowledges.findIndex(knowledge => knowledge.id === id);
    
    if (knowledgeIndex === -1) {
        return;
    }

    knowledges.splice(knowledgeIndex, 1);

    setLocalStorageItem('knowledges', knowledges);

    const res = await createTimeoutPromise('deleted');

    return res;
}