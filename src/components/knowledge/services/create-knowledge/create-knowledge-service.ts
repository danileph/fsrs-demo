import { createId } from "../../../../lib/create-id";
import { createTimeoutPromise } from "../../../../lib/fakeFetch";
import { getLocalStorageItem, setLocalStorageItem } from "../../../../lib/local-storage-helpers";
import { LocalStorageKeys } from "../../lib/consts";
import { createLearningHistory } from "../../lib/learning-history-helpers";
import { Knowledge, LearningAction } from "../../types";
import { CreateKnowledgeRequestBody } from "./create-knowledge-dto";

export const createKnowledgeService = async (data: CreateKnowledgeRequestBody, date: Date = new Date()) => {
    const knowledges = getLocalStorageItem<Knowledge[]>(LocalStorageKeys.Knowledges) ?? [];
 
    const newLearningHistory = createLearningHistory({ action: LearningAction.Created, date: date });

    const newKnowledge = { ...data, id: createId(), learningHistory: [newLearningHistory] };
    
    knowledges?.push(newKnowledge);
    setLocalStorageItem(LocalStorageKeys.Knowledges, knowledges);

    const res = await createTimeoutPromise(newKnowledge);

    return res;
}