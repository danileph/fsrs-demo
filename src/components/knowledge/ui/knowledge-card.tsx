import { FC, useState } from "react"
import { cn } from "../../../lib/cn"
import { Card, Popconfirm, Progress, Tag, Typography } from "antd"
import { Knowledge } from "../types"
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons"
import { MutateKnowledgeWindow } from "./mutate-knowledge-window"
import { MutateKnowledgeWindowMode } from "../lib/consts"
import { useDeleteKnowledge } from "../services/delete-knowledge/delete-knowledge-hook"
import { formatDateToString } from "../../../lib/date-helpers"
import { useFsrs } from "../../../hooks/fsrs-hook"
import { toPercentNumber } from "../lib/percent-helpers"
import { getProgressColor } from "../lib/get-progress-color"

export interface IKnowledgeCardProps extends React.HTMLAttributes<HTMLDivElement> {
    knowledge: Knowledge,
}

export const KnowledgeCard: FC<IKnowledgeCardProps> = ({knowledge, className, ...props}) => {
    const [mutateKnowledgeWindowOpen, setMutateKnowledgeWindowOpen] = useState(false);
    const { mutate: deleteKnowledge } = useDeleteKnowledge();
    const { getRetrievability } = useFsrs();
    const retrievability = knowledge.reviewState ? getRetrievability(knowledge.reviewState) : undefined;

    const handleOnKnowledgeUpdateClick = () => {
        setMutateKnowledgeWindowOpen(true);
    }

    const handleOnKnowledgeDeleteClick = () => {
        deleteKnowledge({id: knowledge.id});
    }

    return (
        <>
            <Card 
                title={knowledge.name}
                extra={<Tag color={retrievability ? getProgressColor(retrievability) : undefined}>{knowledge.reviewState ? `${knowledge.reviewState.rememberInterval} дн`: "Новая"}</Tag>}
                actions={[
                    <EyeOutlined key="view" />,
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
                            <Typography.Text className="block"><Typography.Text type="secondary" className="text-xs">Повторить:</Typography.Text> {formatDateToString(knowledge.reviewState.nextReviewDate)}</Typography.Text>
                            <Typography.Text className="block"><Typography.Text type="secondary" className="text-xs">Последние повторение:</Typography.Text> {formatDateToString(knowledge.reviewState.nextReviewDate)}</Typography.Text>
                            <Progress percent={toPercentNumber(retrievability)} size="small" className="mt-4" status="normal" strokeColor={getProgressColor(retrievability)} />
                            <Typography.Text type="secondary" className="text-xs block text-center">Вероятность вспомнить</Typography.Text>
                        </>
                    )}
                </div>
            </Card>
            <MutateKnowledgeWindow open={mutateKnowledgeWindowOpen} onClose={() => setMutateKnowledgeWindowOpen(false)} mode={MutateKnowledgeWindowMode.Update} knowledge={knowledge} />
        </>
    );
}