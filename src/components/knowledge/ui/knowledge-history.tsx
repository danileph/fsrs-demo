import { FC, useEffect, useState } from "react";
import { Knowledge, LearningAction, LearningHistory } from "../types";
import { Progress, Timeline, Typography } from "antd";
import { formatDateToString, formatDateToStringWithTime } from "../../../lib/date-helpers";
import { KnowledgeReviewParam } from "./knowledge-review-param";
import { ScrollArea } from "../../ui";
import { roundToInteger, toPercentNumber } from "../lib/number-helpers";
import { useCurrentDate } from "../../../store";
import { useFsrs } from "../../../hooks/fsrs-hook";
import { getProgressColor } from "../lib/get-color-helpers";
import { getPreviousActionHistory } from "../lib/learning-history-helpers";

export interface IKnowledgeHistoryProps {
    knowledge: Knowledge;
}

export const KnowledgeHistory: FC<IKnowledgeHistoryProps> = ({ knowledge, ...props }) => {
    const { currentDate } = useCurrentDate();
    const { getRetrievability } = useFsrs();

    const getTimelineItemColor = (action: LearningAction) => {
        switch (action) {
            case LearningAction.Created:
                return 'green';
            case LearningAction.Reviewed:
                return 'blue';
            case LearningAction.Updated:
                return 'orange';
            case LearningAction.Deleted:
                return 'red';
        }
    }   

    const getTimelineItemChildren = (action: LearningAction, history: LearningHistory) => {
        // const retrievability = history.reviewState ? getRetrievability(history.reviewState, history.date) : undefined;
        // const previousHistory = getPreviousActionHistory(history, knowledge.learningHistory);
        // const previousRetrievability = (previousHistory?.reviewState && history?.reviewState) ? getRetrievability(previousHistory.reviewState, history.date) : undefined;

        switch (action) {
            case LearningAction.Created:
                return `Создана: ${formatDateToStringWithTime(history.date)}`;
                break;
            case LearningAction.Updated:
                return `Обновлена: ${formatDateToStringWithTime(history.date)}`;
                break;
            case LearningAction.Deleted:
                return `Удалена: ${formatDateToStringWithTime(history.date)}`;
                break;
            case LearningAction.Reviewed:
                return (
                    <>
                        <Typography.Text>Повторена: {formatDateToStringWithTime(history.date)}</Typography.Text>
                        {history.reviewState && (
                            <>
                                <KnowledgeReviewParam label="Повторить:">{formatDateToStringWithTime(history.reviewState.nextReviewDate)}</KnowledgeReviewParam>
                                <KnowledgeReviewParam label="Интервал припоминания:">{roundToInteger(history.reviewState.rememberInterval)} дн</KnowledgeReviewParam>
                                <KnowledgeReviewParam label="Оценка (grade):">{history.reviewState.grade}</KnowledgeReviewParam>
                                <KnowledgeReviewParam label="Стабильность (stability):">{history.reviewState.stability}</KnowledgeReviewParam>
                                <KnowledgeReviewParam label="Сложность (difficulty):">{history.reviewState.difficulty}</KnowledgeReviewParam>
                                {/* {retrievability !== undefined && (
                                    <KnowledgeReviewParam label="Вероятность вспомнить (retrievability):">{previousRetrievability !== undefined && (`${toPercentNumber(previousRetrievability)}% -> `)}{toPercentNumber(retrievability)}%</KnowledgeReviewParam>
                                )} */}
                            </>
                        )}
                    </>
                )
                break;
        }
    }

    return (
        <div className="max-h-[300px] overflow-auto pr-4 pt-2 text-left">
            <Timeline
                items={knowledge.learningHistory?.map(learningHistory => ({
                    color: getTimelineItemColor(learningHistory.action),
                    children: getTimelineItemChildren(learningHistory.action, learningHistory),
                })).reverse()}
                {...props}
            />
        </div>
    )
}