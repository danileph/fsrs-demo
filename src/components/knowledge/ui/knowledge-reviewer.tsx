import { FC, useEffect, useState } from "react";
import { Knowledge } from "../types";
import { Button, DatePicker, Divider, Modal, Typography } from "antd";
import { useFsrs } from "../../../hooks/fsrs-hook";
import { Grade } from "../../fsrs";
import { useCurrentDate } from "../../../store";
import { useReviewKnowledge } from "../services/review-knowledge/review-knowledge-hook";
import { KnowledgeHistory } from "./knowledge-history";
import dayjs from "dayjs";

export interface IKnowledgeReviewerProps extends React.HTMLAttributes<HTMLDivElement> {
    knowledge: Knowledge,
    open: boolean,
    onClose: () => void,
}

export const KnowledgeReviewer: FC<IKnowledgeReviewerProps> = ({ knowledge, open, onClose, ...props}) => {
    const [ side, setSide ] = useState<'front' | 'back'>('front');
    const [ showHistory, setShowHistory ] = useState(false);
    const { review, createInitialReviewState } = useFsrs();
    const { mutate: reviewKnowledge, isSuccess: reviewKnowledgeSuccess } = useReviewKnowledge();
    const { currentDate, setCurrentDate } = useCurrentDate();

    const resetStates = () => {
        setSide('front');
        setShowHistory(false);
    }

    useEffect(() => {
        if (!open) {
            resetStates();
        }
    }, [open])

    // useEffect(() => {
    //     if (reviewKnowledgeSuccess) {
    //         onClose();
    //     }
    // }, [reviewKnowledgeSuccess]);

    const handleReview = (grade: Grade) => {
        let newReviewState;

        if (!knowledge.reviewState) {
            newReviewState = createInitialReviewState(grade, currentDate);
        } else {
            newReviewState = review(knowledge.reviewState, grade, currentDate);
        }

        reviewKnowledge({ id: knowledge.id, data: {...knowledge, reviewState: newReviewState}, date: currentDate });
    }

    const reviewButtons = [
        {
            label: 'Не помню',
            onClick: () => {
                handleReview(Grade.Again);
            }
        },
        {
            label: 'Сложно',
            onClick: () => {
                handleReview(Grade.Hard);
            }
        },
        {
            label: 'Нормально',
            onClick: () => {
                handleReview(Grade.Good);
            }
        },
        {
            label: 'Легко',
            onClick: () => {
                handleReview(Grade.Easy);
            }
        }
    ]

    const modalFooter = (
        <div className="flex flex-col space-y-2 [&>*]:w-full">
            {side === 'back' && (
                <>
                    <DatePicker value={dayjs(currentDate)} onChange={(date) => setCurrentDate(date.toDate())} />
                    <div className="flex justify-between space-x-2 [&>button]:w-full">
                        {reviewButtons.map((reviewButton, index) => (
                            <Button key={index} onClick={reviewButton.onClick}>{reviewButton.label}</Button>
                        ))}
                    </div>
                </>
            )}
            <Button type="primary" onClick={() => setSide(side === 'front' ? 'back' : 'front')}>{side === 'front' ? 'Показать ответ' : 'Показать вопрос'}</Button>
            <Button type="link" onClick={() => setShowHistory(!showHistory)}>{showHistory ? 'Скрыть историю' : 'Показать историю'}</Button>
            {showHistory && (
                <>
                    <Divider className="!mb-2" />
                    <KnowledgeHistory
                        knowledge={knowledge}
                    />
                </>
            )}
        </div>
    );

    return (
        <Modal
            destroyOnClose
            title="Повторение"
            centered
            open={open}
            onOk={() => onClose()}
            onCancel={() => onClose()}
            footer={modalFooter}
            {...props}
        >
            <div className="my-8">
                {side === 'front' && (
                    <div className="flex flex-col space-y-4">
                        <Typography.Text className="!mb-0">{knowledge.question}</Typography.Text>
                    </div>
                )}
                {side === 'back' && (
                    <div className="flex flex-col space-y-4">
                        <Typography.Text className="!mb-0">{knowledge.answer}</Typography.Text>
                    </div>
                )}
            </div>
        </Modal>
    );
}