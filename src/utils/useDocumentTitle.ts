import { useEffect } from 'react';

const useDocumentTitle = (title: string, restoreOnUnmount: boolean = false) => {
    useEffect(() => {
        const previousTitle = document.title;
        document.title = title;

        return () => {
            if (restoreOnUnmount) {
                document.title = previousTitle;
            }
        };
    }, [title, restoreOnUnmount]);
};

export default useDocumentTitle;
