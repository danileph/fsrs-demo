import { Grade, ReviewState } from "./types";

export class FSRS45 {
  decay: number = -0.5;
  factor: number = 19 / 81;
  
  // Default weights and parameters
  weights: number[] = [0.4, 0.6, 2.4, 5.8, 4.93, 0.94, 0.86, 0.01, 1.49, 9, 0.14, 0.94, 2.18, 0.05, 0.34, 1.26, 2.61];

  constructor() {}

  private getDaysSinceLastReview(lastReviewDate: Date, currentDate: Date): number {
    const timeDiff = currentDate.getTime() - lastReviewDate.getTime();
    return Math.floor(timeDiff / (1000 * 3600 * 24));
  }

  retrievability(daysSinceLastReview: number, stability: number): number {
    return Math.pow((1 + this.factor * (daysSinceLastReview / stability)), this.decay);
  }

  calculateNextInterval(targetRetrievability: number, stability: number): number {
    return (stability / this.factor) * (Math.pow(targetRetrievability, -1 / this.decay) - 1);
  }

  updateStability(difficulty: number, stability: number, retrievability: number, grade: Grade): number {
    const w = this.weights;
    const grade2Factor = grade === Grade.Hard ? 1 : 0;
    const grade4Factor = grade === Grade.Easy ? 1 : 0;
    const stabilityIncrement = stability * (Math.exp(1 - difficulty) * Math.pow(1 - retrievability, w[8]) - 1) * (w[15] * grade2Factor + w[16] * grade4Factor + 1);
    return stabilityIncrement + stability;
  }

  stabilityAfterForgetting(difficulty: number, stability: number, retrievability: number): number {
    const w = this.weights;
    return w[11] * Math.pow(difficulty, -w[12]) * (Math.pow(stability + 1, w[13]) - 1) * Math.exp(w[14] * (1 - retrievability));
  }

  calculateNextReviewInterval(reviewState: ReviewState, currentDate: Date): number {
    const { lastReviewDate, stability, difficulty, grade, targetRetrievability } = reviewState;
    const daysSinceLastReview = this.getDaysSinceLastReview(lastReviewDate, currentDate);

    // Calculate retrievability
    const retrievability = this.retrievability(daysSinceLastReview, stability);

    // Calculate the new stability after review
    const newStability = this.updateStability(difficulty, stability, retrievability, grade);

    // Calculate the next review interval
    const nextInterval = this.calculateNextInterval(targetRetrievability, newStability);

    return nextInterval;
  }

  calculateInitialStability(grade: Grade): number {
    return this.weights[grade - 1];
  }

  calculateInitialDifficulty(grade: Grade): number {
    return this.weights[4] - (grade - 3) * this.weights[5];
  }

  // Method to create the initial ReviewState
  createInitialReviewState(grade: Grade, reviewDate: Date = new Date()): ReviewState {
    const initialStability = this.calculateInitialStability(grade);
    const initialDifficulty = this.calculateInitialDifficulty(grade);

    return {
      lastReviewDate: reviewDate,
      stability: initialStability,
      difficulty: initialDifficulty,
      grade: Grade.Good, // assuming the initial grade is "good"
      targetRetrievability: 0.9, // assuming we want 90% retrievability
    };
  }

  // Method to calculate the next review date
  getNextReviewDate(reviewState: ReviewState, currentDate: Date = new Date()): Date {
    const nextInterval = this.calculateNextReviewInterval(reviewState, currentDate);
    const nextReviewDate = new Date(currentDate);
    nextReviewDate.setDate(nextReviewDate.getDate() + nextInterval);
    return nextReviewDate;
  }

  // Method to review and return the new ReviewState
  review(reviewState: ReviewState, grade: Grade, reviewDate: Date = new Date()): ReviewState {
    const { stability, difficulty, targetRetrievability } = reviewState;
    const daysSinceLastReview = this.getDaysSinceLastReview(reviewState.lastReviewDate, reviewDate);

    // Calculate retrievability
    const retrievability = this.retrievability(daysSinceLastReview, stability);

    // Update stability and difficulty based on the review grade
    const newStability = this.updateStability(difficulty, stability, retrievability, grade);

    // Calculate the next review interval
    const nextInterval = this.calculateNextInterval(targetRetrievability, newStability);

    // Calculate the next review date
    const nextReviewDate = new Date(reviewDate);
    nextReviewDate.setDate(nextReviewDate.getDate() + nextInterval);

    return {
      lastReviewDate: nextReviewDate,
      stability: newStability,
      difficulty,
      grade,
      targetRetrievability
    };
  }
}