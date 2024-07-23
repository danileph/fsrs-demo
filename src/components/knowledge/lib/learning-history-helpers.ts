import { createId } from "../../../lib/create-id"
import { ReviewState } from "../../fsrs"
import { LearningAction, LearningHistory } from "../types"

interface CreateLearningHistoryProps {
    action: LearningAction,
    date?: Date,
    reviewState?: ReviewState,
}

export const createLearningHistory = ({ action, date = new Date(), reviewState }: CreateLearningHistoryProps): LearningHistory => {
    return {
        id: createId(),
        action,
        reviewState,
        date
    }
}

export const getPreviousActionHistory = (action: LearningHistory, history: LearningHistory[]): LearningHistory | undefined => {
    const { action: actionType } = action;

    const filteredHistory = history.filter((h) => h.action === actionType);

    if (filteredHistory.length === 0) {
        return;
    }

    return filteredHistory[filteredHistory.length - 1];
}