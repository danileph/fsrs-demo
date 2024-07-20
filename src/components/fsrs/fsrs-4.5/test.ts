import { FSRS } from "./fsrs";
import { Grade, IFSRS, ReviewState } from "../types";
import { formatDateToString } from "../../../lib/date-helpers";

export const test = () => {
  // Create an instance of the FSRS45 class
  const spacedRepetition: IFSRS = new FSRS();
  
  // Simulation parameters
  let currentReviewState: ReviewState | null;
  
  // List of grades for each review
  const reviewGrades = [
    Grade.Again,
    Grade.Hard,
    Grade.Good,
    Grade.Again,
    Grade.Good,
  ];
  
  // Simulate reviews
  reviewGrades.forEach((grade, i) => {
    if (!currentReviewState) {
      currentReviewState = spacedRepetition.createInitialReviewState(grade);
    } else {
      currentReviewState = spacedRepetition.review(currentReviewState, grade, currentReviewState.nextReviewDate);
    }
  
    // Output the results of each review
    console.log(`Review ${i + 1}:`);
    console.log(`   Grade: ${grade}`);
    console.log(`   Last Review Date: ${formatDateToString(currentReviewState.lastReviewDate)}`);
    console.log(`   Next Review Date: ${formatDateToString(currentReviewState.nextReviewDate)}`);
    console.log(`   Stability: ${currentReviewState.stability}`);
    console.log(`   Difficulty: ${currentReviewState.difficulty}`);
    console.log(`   Target Retrievability: ${currentReviewState.targetRetrievability}`);
    console.log('--------------------------------------');
  });
}