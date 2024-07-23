import { Typography } from "antd"
import { FC } from "react"
import { cn } from "../../../lib/cn"

export interface IKnowledgeReviewParamProps extends React.HTMLAttributes<HTMLDivElement> {
    label: string,
}

export const KnowledgeReviewParam: FC<IKnowledgeReviewParamProps> = ({ label, children, className,  ...props }) => {
    return (
        <Typography.Text className={cn("block", className)} {...props}><Typography.Text type="secondary" className="text-xs mr-2">{label}</Typography.Text>{children}</Typography.Text>
    )
}