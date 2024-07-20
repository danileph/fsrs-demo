import { createTimeoutPromise } from "../../../../lib/fakeFetch";
import { setLocalStorageItem } from "../../../../lib/local-storage-helpers";
import { LocalStorageKeys } from "../../lib/consts";
import { SetKnowledgesRequestBody } from "./set-knowledges-dto";

export const setKnowledgesService = async (data: SetKnowledgesRequestBody) => {
    setLocalStorageItem(LocalStorageKeys.Knowledges, data);

    const res = await createTimeoutPromise(data);

    return res;
}