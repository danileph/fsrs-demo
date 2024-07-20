import { Knowledge } from "../../types";

export type CreateKnowledgeRequestBody = Omit<Knowledge, 'id'>;