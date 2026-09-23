import { useState, useEffect, useRef } from "react";
import "./Game.css";

function Game({ onNext }) {
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [cakes, setCakes] = useState([]);
    const [points, setPoints] = useState([]);
    const [timeLeft, setTimeLeft] = useState(30);

    const cakeId = useRef(0);
    const pointId = useRef(0);

    const TOTAL_TIME = 30;

    /* =========================
       START GAME
    ========================= */

    const startGame = () => {
        setScore(0);
        setCakes([]);
        setPoints([]);
        setGameOver(false);
        setTimeLeft(TOTAL_TIME);
        setGameStarted(true);
    };

    /* =========================
       CREATE CAKE
    ========================= */

    const createCake = () => {
        const newCake = {
            id: cakeId.current++,
            x: Math.random() * 90 + 5,
            y: -50
        };

        setCakes(prev => [...prev, newCake]);
    };

    /* =========================
       CAKE SPAWNING
    ========================= */

    useEffect(() => {
        if (!gameStarted) return;

        createCake();

        const firstCake = setTimeout(() => {
            createCake();
        }, 200);

        const secondCake = setTimeout(() => {
            createCake();
        }, 400);

        const spawnTimer = setInterval(() => {
            createCake();
        }, 700);

        /* =========================
           30 SECOND GAME
        ========================= */

        const gameTimer = setTimeout(() => {
            clearInterval(spawnTimer);

            setGameStarted(false);
            setGameOver(true);
            setCakes([]);
            setTimeLeft(0);
        }, TOTAL_TIME * 1000);

        return () => {
            clearTimeout(firstCake);
            clearTimeout(secondCake);
            clearInterval(spawnTimer);
            clearTimeout(gameTimer);
        };
    }, [gameStarted]);

    /* =========================
       COUNTDOWN TIMER
    ========================= */

    useEffect(() => {
        if (!gameStarted) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [gameStarted]);

    /* =========================
       CAKE FALLING
       2% FASTER
    ========================= */

    useEffect(() => {
        if (!gameStarted) return;

        const fallTimer = setInterval(() => {
            setCakes(prevCakes =>
                prevCakes
                    .map(cake => ({
                        ...cake,
                        y: cake.y + 5.1
                    }))
                    .filter(
                        cake =>
                            cake.y <
                            window.innerHeight + 50
                    )
            );
        }, 100);

        return () => clearInterval(fallTimer);
    }, [gameStarted]);

    /* =========================
       CATCH CAKE
    ========================= */

    const catchCake = (id) => {
        const clickedCake = cakes.find(
            cake => cake.id === id
        );

        if (!clickedCake) return;

        setScore(prev => prev + 1);

        const newPoint = {
            id: pointId.current++,
            x: clickedCake.x,
            y: clickedCake.y
        };

        setPoints(prev => [...prev, newPoint]);

        setCakes(prevCakes =>
            prevCakes.filter(
                cake => cake.id !== id
            )
        );

        setTimeout(() => {
            setPoints(prev =>
                prev.filter(
                    point =>
                        point.id !== newPoint.id
                )
            );
        }, 800);
    };

    /* =========================
       SCORE MESSAGE
    ========================= */

    const getMessage = () => {
        if (score >= 40) {
            return "WOW! That's my gamer friend 🎮";
        }

        if (score >= 25) {
            return "Of course! You are the number 1!";
        }

        if (score >= 15) {
            return "That's a sweet score!";
        }

        if (score >= 5) {
            return "I expected much better from you Steffy 👀";
        }

        return "WHAT!!!! 😳";
    };


    /*
       Calculate ring progress.

       30 seconds = full circle
       0 seconds = empty circle
    */

    const timerProgress =
        (timeLeft / TOTAL_TIME) * 100;

    return (
        <div className="game-page">

            {/* =========================
                GAME INTRO
            ========================= */}

            {!gameStarted && !gameOver && (
                <div className="game-intro">

                    <div className="game-intro-content">

                        <h1>
                            CATCH THE CAKES
                        </h1>

                        <p className="game-subtitle">
                            Catch the falling cakes as fast as you can
                            to earn points.
                        </p>

                        <div className="cake-preview">
                            <span>🍰</span>
                            <span>🍰</span>
                            <span>🍰</span>
                        </div>

                        {/* =========================
                            VIDEO DEMO
                        ========================= */}

                        <div className="game-demo">

                            <video
                                className="demo-video"
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="auto"
                            >
                                <source
                                    src="/demo.mp4"
                                    type="video/mp4"
                                />

                                Your browser does not support
                                the video tag.
                            </video>

                        </div>

                        {/* =========================
                            INTRO BUTTONS
                        ========================= */}

                        <div className="game-intro-buttons">

                            <button
                                className="game-start-button"
                                onClick={startGame}
                            >
                                LET'S GO
                            </button>

                            <button
                                className="game-later-button"
                                onClick={onNext}
                            >
                                LATER
                            </button>

                        </div>

                    </div>

                </div>
            )}

            {/* =========================
                ACTIVE GAME
            ========================= */}

            {gameStarted && (
                <div className="active-game">

                    {/* =========================
                        SCORE
                    ========================= */}

                    <h2 className="game-score">
                        Score: {score}
                    </h2>

                    {/* =========================
                        CIRCULAR TIMER
                    ========================= */}

                    <div
                        className="game-timer"
                        style={{
                            "--timer-progress":
                                `${timerProgress}%`
                        }}
                    >
                        <div className="timer-ring">

                            <div className="timer-inner">
                                {timeLeft}
                            </div>

                        </div>
                    </div>

                    {/* =========================
                        GAME ARENA
                    ========================= */}

                    <div className="game-arena">

                        {cakes.map(cake => (
                            <button
                                key={cake.id}
                                onClick={() =>
                                    catchCake(cake.id)
                                }
                                className="falling-cake"
                                style={{
                                    left: `${cake.x}%`,
                                    top: `${cake.y}px`
                                }}
                            >
                                🍰
                            </button>
                        ))}

                        {points.map(point => (
                            <div
                                key={point.id}
                                className="point-effect"
                                style={{
                                    left: `${point.x}%`,
                                    top: `${point.y}px`
                                }}
                            >
                                <span className="twinkle-star">
                                    ✦
                                </span>

                                <span className="point-text">
                                    +1
                                </span>
                            </div>
                        ))}

                    </div>

                </div>
            )}

            {/* =========================
                GAME OVER
            ========================= */}

            {gameOver && (
                <div className="game-over">

                    <div className="game-over-content">

                        <h1>
                            TIME'S UP!
                        </h1>

                        <h2>
                            Your Score
                        </h2>

                        <div className="final-score">
                            {score} 🍰
                        </div>

                        <p className="score-message">
                            {getMessage()}
                        </p>

                        <div className="game-over-buttons">

                            <button
                                className="game-start-button"
                                onClick={startGame}
                            >
                                TRY AGAIN
                            </button>

                            <button
                                className="game-later-button"
                                onClick={onNext}
                            >
                                CONTINUE
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}

export default Game;