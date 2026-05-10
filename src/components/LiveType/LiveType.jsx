import { useState, useEffect, useRef } from 'react';
import './LiveType.css';

const LiveType = ({
    text = '',
    speed = 60,
    delay = 0,
    shineSpeed = 3,
    cursor = true,
    className = '',
    onDone,
}) => {
    const [displayed, setDisplayed] = useState('');
    const [done, setDone] = useState(false);
    const indexRef = useRef(0);

    useEffect(() => {
        setDisplayed('');
        setDone(false);
        indexRef.current = 0;

        const startTimer = setTimeout(() => {
            const interval = setInterval(() => {
                indexRef.current += 1;
                setDisplayed(text.slice(0, indexRef.current));
                if (indexRef.current >= text.length) {
                    clearInterval(interval);
                    setDone(true);
                    onDone?.();
                }
            }, speed);
            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(startTimer);
    }, [text, speed, delay, onDone]);

    return (
        <span className={`livetype ${className}`} style={{ '--shine-speed': `${shineSpeed}s` }}>
            {displayed}
            {cursor && (
                <span className={`lt-cursor ${done ? 'lt-cursor--blink' : 'lt-cursor--solid'}`}>
                    |
                </span>
            )}
        </span>
    );
};

export default LiveType;