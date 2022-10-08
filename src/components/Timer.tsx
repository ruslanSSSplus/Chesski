import React, {FC, useEffect, useRef, useState} from 'react';
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";

interface TimerProps {
    currentPlayer: Player | null
    restart: () => void
}

const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {

    const [blackTimer, setBlackTimer] = useState(300)
    const [whiteTimer, setWhiteTimer] = useState(300)
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    useEffect( () => {
        startTimer()
    }, [currentPlayer])

    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current)
        }
        const callback = currentPlayer?.color === Colors.WHITE ?
            decrementWhiteTimer : decrementBlackTimer
        timer.current = setInterval(callback, 1000)
    }


    function decrementWhiteTimer() {
        setWhiteTimer(prev => prev - 1)
    }

    function decrementBlackTimer() {
        setBlackTimer(prev => prev - 1)
    }

    const handleRestart = () => {
        setWhiteTimer(300)
        setBlackTimer(300)
        restart()
    }

    return (
        <div>
            <div>
                <button onClick={handleRestart}>
                    Restart Game
                </button>
            </div>
            <h2>
                Черные - {blackTimer}
            </h2>
            <h2>
                Белые - {whiteTimer}
            </h2>
        </div>
    );
};

export default Timer;