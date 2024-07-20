// Function to set an item in local storage
export const setLocalStorageItem = (key: string, value: unknown): void => {
    localStorage.setItem(key, JSON.stringify(value));
};

// Function to get an item from local storage
export const getLocalStorageItem = <T>(key: string): T | null => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
};

// Function to remove an item from local storage
export const removeLocalStorageItem = (key: string): void => {
    localStorage.removeItem(key);
};

// Function to clear all items from local storage
export const clearLocalStorage = (): void => {
    localStorage.clear();
};