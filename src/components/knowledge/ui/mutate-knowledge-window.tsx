import { Button, Drawer, Form, FormProps, Input } from "antd"
import { FC, useEffect } from "react"
import { MutateKnowledgeWindowMode } from "../lib/consts"
import { useCreateKnowledge } from "../services/create-knowledge/create-knowledge-hook"
import { useUpdateKnowledge } from "../services/update-knowledge/update-knowledge-hook"
import { Knowledge } from "../types"
import { useCurrentDate } from "../../../store"

export interface IMutateKnowledgeWindowProps extends React.HTMLAttributes<HTMLDivElement> {
    open: boolean,
    onClose: () => void,
    mode: MutateKnowledgeWindowMode,
    knowledge?: Knowledge,
}

export const MutateKnowledgeWindow: FC<IMutateKnowledgeWindowProps> = ({onClose, open, mode, knowledge, ...props}) => {
    const title = mode === MutateKnowledgeWindowMode.Create ? "Добавить карточку" : "Редактировать карточку";
    const { mutate: createKnowledge, isSuccess: isCreteateKnowledgeSuccess } = useCreateKnowledge();
    const { mutate: updateKnowledge, isSuccess: isUpdateKnowledgeSuccess } = useUpdateKnowledge();
    const { currentDate } = useCurrentDate();

    // const handleOnOkClick = () => {
    //     if (mode === MutateKnowledgeWindowMode.Create) {
    //         createKnowledge(knowledge);
    //     } else if (mode === MutateKnowledgeWindowMode.Update) {
    //         updateKnowledge(knowledge);
    //     }
    // }

    useEffect(() => {
        if (isCreteateKnowledgeSuccess || isUpdateKnowledgeSuccess) {
            onClose();
        }
    }, [isCreteateKnowledgeSuccess, isUpdateKnowledgeSuccess])

    const onFinish: FormProps<Knowledge>['onFinish'] = (values) => {
        console.log(values);
        
        if (mode === MutateKnowledgeWindowMode.Create) {
            createKnowledge({data: values, date: currentDate});
        } else if (mode === MutateKnowledgeWindowMode.Update && knowledge) {
            updateKnowledge({id: knowledge.id, data: values, date: currentDate});
        }
    };
      
    const onFinishFailed: FormProps<Knowledge>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Drawer
            title={title}
            placement="right"
            onClose={onClose}
            open={open}
            destroyOnClose
            {...props}
        >
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={knowledge}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
            >
                <Form.Item<Knowledge>
                    label="Название"
                    name="name"
                    rules={[{ required: true, message: 'Пожалуйста, заполните это поле!' }]}
                    wrapperCol={{  }}
                >
                    <Input/>
                </Form.Item>

                <Form.Item<Knowledge>
                    label="Вопрос"
                    name="question"
                    rules={[{ required: true, message: 'Пожалуйста, заполните это поле!' }]}
                    wrapperCol={{  }}
                >
                    <Input.TextArea rows={8} />
                </Form.Item>

                <Form.Item<Knowledge>
                    label="Ответ"
                    name="answer"
                    rules={[{ required: true, message: 'Пожалуйста, заполните это поле!' }]}
                    wrapperCol={{  }}
                >
                    <Input.TextArea rows={8} />
                </Form.Item>

                <Form.Item wrapperCol={{  }}>
                    <Button type="primary" htmlType="submit" className="w-full">
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>
    )
}