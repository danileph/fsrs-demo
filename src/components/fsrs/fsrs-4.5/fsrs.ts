import { Grade, ReviewState, IFSRS } from "../types";

export class FSRS implements IFSRS {
  decay: number = -0.5;
  factor: number = 19 / 81;
  
  // Default weights and parameters
  weights: number[] = [0.4872, 1.4003, 3.7145, 13.8206, 5.1618, 1.2298, 0.8975, 0.031, 1.6474, 0.1367, 1.0461, 2.1072, 0.0793, 0.3246, 1.587, 0.2272, 2.8755];

  constructor() {}

  private getDaysSinceLastReview(lastReviewDate: Date, currentDate: Date): number {
    const timeDiff = currentDate.getTime() - lastReviewDate.getTime();
    return Math.floor(timeDiff / (1000 * 3600 * 24));
  }

  private calculateRetrievability(daysSinceLastReview: number, stability: number): number {
    return Math.pow((1 + this.factor * (daysSinceLastReview / stability)), this.decay);
  }

  private calculateNextInterval(targetRetrievability: number, stability: number): number {
    return (stability / this.factor) * (Math.pow(targetRetrievability, 1 / this.decay) - 1);
  }

  private calculateNextReviewDate(lastReviewDate: Date, nextInterval: number): Date {
    const nextReviewDate = new Date(lastReviewDate);
    nextReviewDate.setDate(nextReviewDate.getDate() + nextInterval);
    return nextReviewDate;
  }

  private calculateStabilityAfterSuccessfulReview(difficulty: number, stability: number, retrievability: number, grade: Grade): number {
    const w = this.weights;
    const e = Math.E;
    const w_15 = grade === Grade.Hard ? w[15] : 1;
    const w_16 = grade === Grade.Easy ? w[16] : 1;

    const newStability = stability * (e ** w[8] * (11 - difficulty) * stability ** -w[9] * (e ** (w[10] * (1 - retrievability)) - 1) * w_15 * w_16 + 1);

    if (newStability < 1) {
      return 1;
    }

    return newStability;
  }

  private calculateStabilityAfterForgetting(difficulty: number, stability: number, retrievability: number): number {
    const w = this.weights;
    return w[11] * Math.pow(difficulty, -w[12]) * (Math.pow(stability + 1, w[13]) - 1) * Math.exp(w[14] * (1 - retrievability));
  }

  private calculateStability(difficulty: number, stability: number, retrievability: number, grade: Grade): number {
    if (grade === Grade.Again) {
      return this.calculateStabilityAfterForgetting(difficulty, stability, retrievability);
    } else {
      return this.calculateStabilityAfterSuccessfulReview(difficulty, stability, retrievability, grade);
    }
  }

  private calculateDifficulty(difficulty: number, grade: Grade): number {
    const w = this.weights;
    return w[7] * this.calculateInitialDifficulty(3) + (1 - w[7]) * (difficulty - w[6] * (grade - 3));
  }

  // private calculateNextReviewInterval(reviewState: ReviewState, currentDate: Date): number {
  //   const { lastReviewDate, stability } = reviewState;
  //   const daysSinceLastReview = this.getDaysSinceLastReview(lastReviewDate, currentDate);

  //   // Calculate retrievability
  //   const retrievability = this.calculateRetrievability(daysSinceLastReview, stability);

  //   // // Calculate the new stability after review
  //   // const newStability = this.updateStability(difficulty, stability, retrievability, grade);

  //   // Calculate the next review interval
  //   const nextInterval = this.calculateNextInterval(retrievability, stability);

  //   return nextInterval;
  // }

  private calculateInitialStability(grade: Grade): number {
    return this.weights[grade - 1];
  }

  private calculateInitialDifficulty(grade: Grade): number {
    return this.weights[4] - (grade - 3) * this.weights[5];
  }

  // Method to create the initial ReviewState
  public createInitialReviewState(grade: Grade, reviewDate: Date = new Date(), targetRetrievability = 0.9): ReviewState {
    const initialStability = this.calculateInitialStability(grade);
    const initialDifficulty = this.calculateInitialDifficulty(grade);

    // Calculate the next review interval
    const nextInterval = this.calculateNextInterval(targetRetrievability, initialStability);

    // Calculate the next review date
    const nextReviewDate = this.calculateNextReviewDate(reviewDate, nextInterval);

    return {
      lastReviewDate: reviewDate,
      nextReviewDate,
      rememberInterval: nextInterval,
      stability: initialStability,
      difficulty: initialDifficulty,
      grade: grade,
      targetRetrievability,
    };
  }

  // // Method to calculate the next review date
  // public getNextReviewDate(reviewState: ReviewState, currentDate: Date = new Date()): Date {
  //   const nextInterval = this.calculateNextReviewInterval(reviewState, currentDate);
  //   const nextReviewDate = new Date(currentDate);
  //   nextReviewDate.setDate(nextReviewDate.getDate() + nextInterval);
  //   return nextReviewDate;
  // }

  public getRetrievability(reviewState: ReviewState, currentDate: Date = new Date()): number {
    const { lastReviewDate, stability } = reviewState;
    const daysSinceLastReview = this.getDaysSinceLastReview(lastReviewDate, currentDate);
    return this.calculateRetrievability(daysSinceLastReview, stability);
  }

  // Method to review and return the new ReviewState
  public review(reviewState: ReviewState, grade: Grade, reviewDate: Date = new Date()): ReviewState {
    const { stability, difficulty, targetRetrievability, lastReviewDate } = reviewState;
    const daysSinceLastReview = this.getDaysSinceLastReview(lastReviewDate, reviewDate);

    // Calculate retrievability
    const retrievability = this.calculateRetrievability(daysSinceLastReview, stability);

    // Calculate difficulty
    const newDifficulty = this.calculateDifficulty(difficulty, grade);

    // Update stability and difficulty based on the review grade
    const newStability = this.calculateStability(newDifficulty, stability, retrievability, grade);

    // Calculate the next review interval
    const nextInterval = this.calculateNextInterval(targetRetrievability, newStability);

    // Calculate the next review date
    const nextReviewDate = this.calculateNextReviewDate(reviewDate, nextInterval);

    return {
      lastReviewDate: reviewDate,
      nextReviewDate,
      rememberInterval: nextInterval,
      stability: newStability,
      difficulty: newDifficulty,
      grade,
      targetRetrievability
    };
  }
}