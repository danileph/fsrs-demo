import { createFsrs } from "../components/fsrs"

export const useFsrs = () => {
    const fsrs = createFsrs();

    const createInitialReviewState = fsrs.createInitialReviewState;
    const review = fsrs.review;
    const getRetrievability = fsrs.getRetrievability;

    return {
        createInitialReviewState: createInitialReviewState.bind(fsrs),
        review: review.bind(fsrs),
        getRetrievability: getRetrievability.bind(fsrs),
    };
}