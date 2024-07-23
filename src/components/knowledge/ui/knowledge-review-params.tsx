import { FC } from "react"
import { Knowledge } from "../types"
import { KnowledgeReviewParam } from "./knowledge-review-param";
import { formatDateToStringWithTime } from "../../../lib/date-helpers";
import { roundToInteger, toPercentNumber } from "../lib/number-helpers";
import { ReviewState } from "../../fsrs";
import { useFsrs } from "../../../hooks/fsrs-hook";

export interface IKnowledgeReviewParamsProps extends React.HTMLAttributes<HTMLDivElement> {
    reviewState: ReviewState,
    currentDate: Date,
}

export const KnowledgeReviewParams: FC<IKnowledgeReviewParamsProps> = ({ reviewState, currentDate }) => {
    const { getRetrievability } = useFsrs();

    const retrievability = reviewState ? getRetrievability(reviewState, currentDate) : undefined;

    return (
        <>
            <KnowledgeReviewParam label="Повторить:">{formatDateToStringWithTime(reviewState.nextReviewDate)}</KnowledgeReviewParam>
            <KnowledgeReviewParam label="Интервал припоминания:">{roundToInteger(reviewState.rememberInterval)} дн</KnowledgeReviewParam>
            <KnowledgeReviewParam label="Оценка (grade):">{reviewState.grade}</KnowledgeReviewParam>
            <KnowledgeReviewParam label="Стабильность (stability):">{reviewState.stability}</KnowledgeReviewParam>
            <KnowledgeReviewParam label="Сложность (difficulty):">{reviewState.difficulty}</KnowledgeReviewParam>
            {retrievability !== undefined && (
                <KnowledgeReviewParam label="Вероятность вспомнить (retrievability):">{toPercentNumber(retrievability)}%</KnowledgeReviewParam>
            )}
        </>
    );
}