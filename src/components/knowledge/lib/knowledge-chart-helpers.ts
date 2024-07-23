import { formatDateToString } from "../../../lib/date-helpers";
import { ChartData, Knowledge, LearningAction } from "../types";

export const mapKnowledgeData = (data: Knowledge[]): ChartData[] => {
    const chartData: ChartData[] = [];

    data.forEach(knowledge => {
        if (!knowledge.learningHistory) return;
            
        knowledge.learningHistory.forEach(learningHistory => {
            if (learningHistory.action !== LearningAction.Reviewed || !learningHistory.reviewState) return;

            chartData.push({
                'Дата повторения': formatDateToString(learningHistory.date),
                'Интервал припоминания': learningHistory.reviewState.rememberInterval,
                'Название карточки': knowledge.name
            })
        })
    })

    return chartData;
}