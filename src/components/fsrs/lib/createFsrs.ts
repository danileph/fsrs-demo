import { FSRS } from "../fsrs-4.5/fsrs";
import { IFSRS } from "../types";

export const createFsrs = (): IFSRS => {
    return new FSRS();
}