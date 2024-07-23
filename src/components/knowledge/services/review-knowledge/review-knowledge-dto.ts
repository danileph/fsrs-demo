import { Knowledge } from "../../types";

export type ReviewKnowledgeRequestBody = Omit<Knowledge, 'id'>;