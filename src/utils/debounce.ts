export default function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
    let timeout: number | null;

    return function (...args: Parameters<T>) {
        if (timeout) {
            clearTimeout(timeout);
        }

        //@ts-expect-error TODO Fix typings
        timeout = setTimeout(() => {
            func(...args);
        }, wait);
    };
}
