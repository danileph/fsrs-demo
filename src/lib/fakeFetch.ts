const TIME_TO_LOAD = 500;

export const createTimeoutPromise = async <T>(data: T): Promise<T> => {
    const fakeTask = new Promise<T>((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, TIME_TO_LOAD);
    });

    return fakeTask;
}