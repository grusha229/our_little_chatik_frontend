import { useEffect, useState } from 'react';

const TIMER_COOLDOWN = 1_000 * 60 * 0.25;

export const useTimer = (activationTime: string): number => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        setTime(parseInt(activationTime) + TIMER_COOLDOWN - Date.now());
        const interval = setInterval(() => {
            setTime(prev => {
                if (prev <= 1000) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1000;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [activationTime]);

    return time;
};
