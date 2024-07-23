import { ReviewState } from "../fsrs";

export type Knowledge = {
    id: string;
    name: string;
    question: string;
    answer: string;
    reviewState?: ReviewState;
    learningHistory: LearningHistory[];
}

export type LearningHistory = {
    id: string;
    date: Date;
    action: LearningAction;
    reviewState?: ReviewState;
}

export enum LearningAction {
    Created = 'created',
    Deleted = 'deleted',
    Updated = 'updated',
    Reviewed = 'reviewed',
}

export type ChartData = {
    "Дата повторения": string,
    "Интервал припоминания": number,
    "Название карточки": string,
}