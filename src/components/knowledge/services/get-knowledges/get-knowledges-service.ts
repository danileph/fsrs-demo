import { createTimeoutPromise } from "../../../../lib/fakeFetch";
import { getLocalStorageItem } from "../../../../lib/local-storage-helpers"
import { LocalStorageKeys } from "../../lib/consts";
import { Knowledge } from "../../types";

export const getKnowledgesService = async () => {
    const knowledges = getLocalStorageItem<Knowledge[]>(LocalStorageKeys.Knowledges);

    const mappedKnowledges = knowledges?.map(knowledge => {
        try {
            return { 
                ...knowledge, 
                reviewState: 
                    knowledge.reviewState ? 
                    { 
                        ...knowledge.reviewState, 
                        lastReviewDate: new Date(knowledge.reviewState.lastReviewDate) 
                    } 
                    : undefined,
                learningHistory: knowledge.learningHistory?.map(learningHistory => {
                    return { 
                        ...learningHistory, 
                        date: new Date(learningHistory.date),
                        reviewState: learningHistory.reviewState ? 
                        { 
                            ...learningHistory.reviewState, 
                            nextReviewDate: new Date(learningHistory.reviewState.nextReviewDate), 
                            lastReviewDate: new Date(learningHistory.reviewState.lastReviewDate) 
                        } : undefined
                    }
                })
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    })

    const res = await createTimeoutPromise(mappedKnowledges);
    return res;
}