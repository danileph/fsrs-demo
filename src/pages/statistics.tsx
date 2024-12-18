import { FC } from "react"
import { KnowledgeLineChart, useGetKnowledges } from "../components/knowledge";
import { Layout } from "../components/layout/ui";

export interface IStatisticsPageProps extends React.HTMLAttributes<HTMLDivElement> {}

export const StatisticsPage: FC<IStatisticsPageProps> = ({ ...props }) => {
    const { data: knowledges } = useGetKnowledges();

    return (
        <Layout className="p-4 min-h-[100vh-50px]" {...props}>
          <KnowledgeLineChart data={knowledges} />
        </Layout>
    )
}