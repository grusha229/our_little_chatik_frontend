export const scrollToBottom = (container: React.RefObject<HTMLElement> | null) => {
    if (!container?.current) {
        return;
    }
    container.current.scrollTop = container.current.scrollHeight - container.current.clientHeight;
};