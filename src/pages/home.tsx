import { FC, useEffect, useState } from "react"
import { CreateKnowledgeCard, KnowledgeCard, MutateKnowledgeWindow, useGetKnowledges } from "../components/knowledge";
import { MutateKnowledgeWindowMode } from "../components/knowledge/lib/consts";
import { Layout } from "../components/layout";

export interface IHomePageProps extends React.HTMLAttributes<HTMLDivElement> {}

export const HomePage: FC<IHomePageProps> = ({ ...props }) => {
    const { data: knowledges } = useGetKnowledges();
    const [mutateKnowledgeWindowOpen, setMutateKnowledgeWindowOpen] = useState(false);
  
    useEffect(() => {
      console.log(knowledges);
    }, [knowledges]);
  
    const handleOnKnowledgeCreateClick = () => {
      setMutateKnowledgeWindowOpen(true);
    }

    return (
        <Layout className="p-4 min-h-[100vh-50px]" {...props}>
            <div className="flex flex-wrap gap-2">
            {knowledges?.map(knowledge => <KnowledgeCard key={knowledge.id} knowledge={knowledge} />)}
                <CreateKnowledgeCard onClick={handleOnKnowledgeCreateClick}/>
            </div>
            <MutateKnowledgeWindow open={mutateKnowledgeWindowOpen} onClose={() => setMutateKnowledgeWindowOpen(false)} mode={MutateKnowledgeWindowMode.Create} />
        </Layout>
    )
}