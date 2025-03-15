import { useEffect, useState } from "react";

const MOBILE_WIDTH = 768;
const TABLET_WIDTH = 1024;

/**
 * @returns {Object} возвращает свойства "width" and "height".
 */
export function useWindowSize() {

    function getSize() {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    }

    const [windowSize, setWindowSize] = useState(getSize);

    useEffect((): (void | (() => void | undefined)) => {

        function handleResize() {
            setWindowSize(getSize());
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return (): void => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return windowSize;
}

export function isMobile(width?: number): boolean {
    if (width === undefined) {
        width = window.innerWidth;
    }

    return width <= MOBILE_WIDTH;
}


export function isTablet(width?: number): boolean {
    if (width === undefined) {
        width = window.innerWidth;
    }

    return width > MOBILE_WIDTH && width <= TABLET_WIDTH;
}

export function isDesktop(width?: number): boolean {
    if (width === undefined) {
        width = window.innerWidth;
    }

    return width > TABLET_WIDTH;
}