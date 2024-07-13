export enum Grade {
  Again = 1,
  Hard = 2,
  Good = 3,
  Easy = 4
}

export type ReviewState = {
  lastReviewDate: Date;
  stability: number;
  difficulty: number;
  grade: Grade;
  targetRetrievability: number;
};