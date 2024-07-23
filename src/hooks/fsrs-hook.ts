import { createFsrs } from "../components/fsrs"

export const useFsrs = () => {
    const fsrs = createFsrs();

    const createInitialReviewState = fsrs.createInitialReviewState;
    const review = fsrs.review;
    const getRetrievability = fsrs.getRetrievability;
    const getRemainingDaysToRemember = fsrs.getRemainingDaysToRemember;

    return {
        createInitialReviewState: createInitialReviewState.bind(fsrs),
        review: review.bind(fsrs),
        getRetrievability: getRetrievability.bind(fsrs),
        getRemainingDaysToRemember: getRemainingDaysToRemember.bind(fsrs),
    };
}