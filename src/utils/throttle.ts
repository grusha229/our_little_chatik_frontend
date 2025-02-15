const throttle = <T extends (...args: any[]) => void>(func: T, delay: number): T => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    return ((...args: Parameters<T>) => {
        if (timeoutId === null) {
        timeoutId = setTimeout(() => {
            func(...args);
            timeoutId = null;
        }, delay);
        }
    }) as T;
};

export default throttle;