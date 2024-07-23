import { useEffect, useState } from "react";
import { CreateKnowledgeCard, KnowledgeCard, MutateKnowledgeWindow, useGetKnowledges } from "./components/knowledge"
import { Layout } from "./components/layout"
import { MutateKnowledgeWindowMode } from "./components/knowledge/lib/consts";

function App() {
  const { data: knowledges } = useGetKnowledges();
  const [mutateKnowledgeWindowOpen, setMutateKnowledgeWindowOpen] = useState(false);

  useEffect(() => {
    console.log(knowledges);
  }, [knowledges]);

  const handleOnKnowledgeCreateClick = () => {
    setMutateKnowledgeWindowOpen(true);
  }

  return (
      <Layout className="h-screen">
        <div className="flex flex-wrap gap-2">
          {knowledges?.map(knowledge => <KnowledgeCard key={knowledge.id} knowledge={knowledge} />)}
          <CreateKnowledgeCard onClick={handleOnKnowledgeCreateClick}/>
        </div>
        <MutateKnowledgeWindow open={mutateKnowledgeWindowOpen} onClose={() => setMutateKnowledgeWindowOpen(false)} mode={MutateKnowledgeWindowMode.Create} />
      </Layout>
  )
}

export default App
