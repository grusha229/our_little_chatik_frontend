export const scrollToBottom = (container: HTMLElement | null) => {
    if (!container) {
        return;
    }
    container.scrollTop = container.scrollHeight - container.clientHeight;
};

export function fetchFunc (url:string,method:string,body:string) {
    return fetch(url, {
        method: method,
        body: body,
    })
}
