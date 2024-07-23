import { FC, useEffect, useState } from "react"
import { cn } from "../../../lib/cn"
import { Card, Popconfirm, Progress, Tag, Typography } from "antd"
import { Knowledge } from "../types"
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons"
import { MutateKnowledgeWindow } from "./mutate-knowledge-window"
import { MutateKnowledgeWindowMode } from "../lib/consts"
import { useDeleteKnowledge } from "../services/delete-knowledge/delete-knowledge-hook"
import { formatDateToString } from "../../../lib/date-helpers"
import { useFsrs } from "../../../hooks/fsrs-hook"
import { roundToInteger, toPercentNumber } from "../lib/number-helpers"
import { getRemainingDaysToRememberColor, getRetrievabilityColor } from "../lib/get-color-helpers"
import { KnowledgeReviewer } from "./knowledge-reviewer"
import { useCurrentDate } from "../../../store"
import { KnowledgeReviewParam } from "./knowledge-review-param"

export interface IKnowledgeCardProps extends React.HTMLAttributes<HTMLDivElement> {
    knowledge: Knowledge,
}

export const KnowledgeCard: FC<IKnowledgeCardProps> = ({knowledge, className, ...props}) => {
    const [mutateKnowledgeWindowOpen, setMutateKnowledgeWindowOpen] = useState(false);
    const [reviewerWindowOpen, setReviewerWindowOpen] = useState(false);
    const { mutate: deleteKnowledge } = useDeleteKnowledge();
    const { getRetrievability, getRemainingDaysToRemember } = useFsrs();
    const { currentDate } = useCurrentDate();
    const [ retrievability, setRetrievability ] = useState<number | undefined>();
    const [ remainingDaysToRemember, setRemainingDaysToRemember ] = useState<number | undefined>();


    useEffect(() => {
        setRetrievability(knowledge.reviewState ? getRetrievability(knowledge.reviewState, currentDate) : undefined);
        setRemainingDaysToRemember(knowledge.reviewState ? getRemainingDaysToRemember(knowledge.reviewState, currentDate) : undefined);
    }, [currentDate, knowledge.reviewState]);

    const handleOnKnowledgeUpdateClick = () => {
        setMutateKnowledgeWindowOpen(true);
    }

    const handleOnKnowledgeDeleteClick = () => {
        deleteKnowledge({id: knowledge.id});
    }

    const handleOnKnowledgeViewClick = () => {
        setReviewerWindowOpen(true);
    }

    return (
        <>
            <Card 
                title={knowledge.name}
                extra={<Tag color={remainingDaysToRemember ? getRemainingDaysToRememberColor(remainingDaysToRemember) : undefined}>{remainingDaysToRemember? `${roundToInteger(remainingDaysToRemember)} дн`: "Новая"}</Tag>}
                actions={[
                    <EyeOutlined key="view" onClick={handleOnKnowledgeViewClick}/>,
                    <EditOutlined key="edit" onClick={handleOnKnowledgeUpdateClick}/>,
                    <Popconfirm
                        title="Удалить карточку?"
                        description="Вы уверены, что хотите удалить эту карточку?"
                        onConfirm={handleOnKnowledgeDeleteClick}
                        okText="Да"
                        cancelText="Нет"
                    >
                        <DeleteOutlined key="delete" className="!text-red-400 hover:!text-red-600"/>
                    </Popconfirm>
                    
                ]}
                className={cn("w-[300px]", className)}
                {...props}
            >
                <div className="min-h-[70px]">
                    {knowledge.reviewState && retrievability !== undefined && (
                        <>
                            <KnowledgeReviewParam label="Повторить:">{formatDateToString(knowledge.reviewState.nextReviewDate)}</KnowledgeReviewParam>
                            <KnowledgeReviewParam label="Последние повторение:">{formatDateToString(knowledge.reviewState.lastReviewDate)}</KnowledgeReviewParam>
                            <Progress percent={toPercentNumber(retrievability)} size="small" className="mt-4" status="normal" strokeColor={getRetrievabilityColor(retrievability)} />
                            <Typography.Text type="secondary" className="text-xs block text-center">Вероятность вспомнить</Typography.Text>
                        </>
                    )}
                </div>
            </Card>
            <MutateKnowledgeWindow open={mutateKnowledgeWindowOpen} onClose={() => setMutateKnowledgeWindowOpen(false)} mode={MutateKnowledgeWindowMode.Update} knowledge={knowledge} />
            <KnowledgeReviewer open={reviewerWindowOpen} onClose={() => setReviewerWindowOpen(false)} knowledge={knowledge} />
        </>
    );
}