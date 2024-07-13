import { FSRS45 } from "./fsrs45";
import { Grade, ReviewState } from "./types";

export const test = () => {
  // Create an instance of the FSRS45 class
  const spacedRepetition = new FSRS45();
  
  // Simulation parameters
  let currentReviewState: ReviewState | null;
  
  // List of grades for each review
  const reviewGrades = [
    Grade.Easy, 
    Grade.Hard, 
    Grade.Good, 
    Grade.Easy, 
    Grade.Again, 
    Grade.Hard, 
    Grade.Good, 
    Grade.Easy
  ];
  
  // Simulate reviews
  reviewGrades.forEach((grade, i) => {
    if (!currentReviewState) {
      const initialReviewState = spacedRepetition.createInitialReviewState(grade);
      currentReviewState = initialReviewState;
    } else {
      const reviewDate = spacedRepetition.getNextReviewDate(currentReviewState);
      currentReviewState = spacedRepetition.review(currentReviewState, grade, reviewDate);
    }
  
    // Output the results of each review
    console.log(`Review ${i + 1}:`);
    console.log(`   Grade: ${grade}`);
    console.log(`   Next Review Date: ${spacedRepetition.getNextReviewDate(currentReviewState).toLocaleDateString()}`);
    console.log(`   Stability: ${currentReviewState.stability}`);
    console.log(`   Difficulty: ${currentReviewState.difficulty}`);
    console.log(`   Target Retrievability: ${currentReviewState.targetRetrievability}`);
    console.log('--------------------------------------');
  });
}