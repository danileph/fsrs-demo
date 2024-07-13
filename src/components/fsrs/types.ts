export enum Grade {
  Again = 1,
  Hard = 2,
  Good = 3,
  Easy = 4
}

export type ReviewState = {
  lastReviewDate: Date;
  nextReviewDate: Date;
  rememberInterval: number;
  stability: number;
  difficulty: number;
  grade: Grade;
  targetRetrievability: number;
};

export interface IFSRS {
  createInitialReviewState(grade: Grade, reviewDate?: Date): ReviewState;
  review(reviewState: ReviewState, grade: Grade, reviewDate: Date): ReviewState;
  getRetrievability(reviewState: ReviewState, currentDate?: Date): number;
}