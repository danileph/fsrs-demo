import { Knowledge } from "../../types";

export type UpdateKnowledgeRequestBody = Omit<Knowledge, 'id'>;