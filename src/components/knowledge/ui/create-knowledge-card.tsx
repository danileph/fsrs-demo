import { Button } from "antd";
import { cn } from "../../../lib/cn";
import { FC } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";

export interface ICreateKnowledgeCardProps extends React.HTMLAttributes<HTMLDivElement> {
}

export const CreateKnowledgeCard: FC<ICreateKnowledgeCardProps> = ({className, ...props}) => {
    return (
        <Button
            className={cn("w-[300px] cursor-pointer min-h-[223px]", className)}
            {...props}
        >
            <div className="flex flex-col items-center space-y-1">
                <PlusCircleOutlined className="text-lg"/>
                Добавить карточку
            </div>
        </Button>
    );
}