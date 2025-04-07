export function debounce(func: any, delay: number) {
    let timeOut: any;
    return (...args: any) => {
        if (timeOut) clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            func(...args);
        }, delay)
    }
}