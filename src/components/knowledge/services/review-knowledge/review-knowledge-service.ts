import { createTimeoutPromise } from "../../../../lib/fakeFetch";
import { getLocalStorageItem, setLocalStorageItem } from "../../../../lib/local-storage-helpers";
import { LocalStorageKeys } from "../../lib/consts";
import { createLearningHistory } from "../../lib/learning-history-helpers";
import { Knowledge, LearningAction } from "../../types";
import { ReviewKnowledgeRequestBody } from "./review-knowledge-dto";

export const updateKnowledgeService = async (id: string, data: ReviewKnowledgeRequestBody, date: Date = new Date()) => {
    const knowledges = getLocalStorageItem<Knowledge[]>(LocalStorageKeys.Knowledges);

    if (!knowledges) {
        return;
    }

    const knowledgeIndex = knowledges.findIndex(knowledge => knowledge.id === id);

    if (knowledgeIndex === -1) {
        return;
    }

    const newLearningHistory = createLearningHistory({ action: LearningAction.Reviewed, date: date, reviewState: data.reviewState });

    knowledges[knowledgeIndex] = { ...knowledges[knowledgeIndex], ...data, learningHistory: [...knowledges[knowledgeIndex].learningHistory, newLearningHistory] };

    setLocalStorageItem(LocalStorageKeys.Knowledges, knowledges);

    const res = await createTimeoutPromise(knowledges[knowledgeIndex]);

    return res;
}