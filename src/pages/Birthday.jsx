import { useEffect, useState } from "react";
import "./Birthday.css";
import pandaImage from "../assets/panda.png";

function Birthday({ onNext }) {
    const [surprises, setSurprises] = useState([]);
    const [confetti, setConfetti] = useState([]);
    const [surpriseIndex, setSurpriseIndex] = useState(0);

    const surpriseOptions = [
        "🎈",
        "🎉",
        "🥂",
        "20",
        "HBD!",
        "✨",
        "🎀",
        "💕",
        "😍",
        "🥳",
        "🫰",
        "💎",
        "🥇",
        "🍬",
        "🎂",
        "🪐",
    ];

    /* =========================
       CONFETTI COLORS
    ========================= */

    const confettiColors = [
        "#ff4d6d",
        "#ffd166",
        "#06d6a0",
        "#4dabf7",
        "#c77dff",
        "#ff9f1c",
        "#ffffff",
    ];

    /* =========================
       CONFETTI ON PAGE OPEN
    ========================= */

    useEffect(() => {
        const pieces = Array.from({ length: 70 }, (_, index) => ({
            id: index,
            left: Math.random() * 100,
            delay: Math.random() * 1.5,
            duration: 3 + Math.random() * 2,
            rotation: Math.random() * 360,
            color:
                confettiColors[
                    Math.floor(Math.random() * confettiColors.length)
                ],
        }));

        setConfetti(pieces);

        const timer = setTimeout(() => {
            setConfetti([]);
        }, 6000);

        return () => clearTimeout(timer);
    }, []);

    /* =========================
       CLICK SURPRISE
    ========================= */

    const handleClick = (event) => {
        const currentSurprise =
            surpriseOptions[surpriseIndex];

        const newSurprise = {
            id: Date.now() + Math.random(),
            text: currentSurprise,
            x: event.clientX,
            y: event.clientY,
        };

        setSurprises((prev) => [
            ...prev,
            newSurprise,
        ]);

        setSurpriseIndex(
            (prevIndex) =>
                (prevIndex + 1) % surpriseOptions.length
        );
    };

    return (
        <div
            className="birthday-page"
            onClick={handleClick}
        >

            {/* =========================
                CONFETTI
            ========================= */}

            {confetti.map((piece) => (
                <div
                    key={piece.id}
                    className="confetti"
                    style={{
                        left: `${piece.left}%`,
                        animationDelay: `${piece.delay}s`,
                        animationDuration: `${piece.duration}s`,
                        backgroundColor: piece.color,
                        transform: `rotate(${piece.rotation}deg)`,
                    }}
                />
            ))}


            {/* =========================
                BIRTHDAY TITLE
            ========================= */}

            <h1 className="birthday-title">
                Happy Birthday Zupiiii! ♥️
            </h1>


            {/* =========================
                PANDA
            ========================= */}

            <img
                src={pandaImage}
                alt="Birthday Panda"
                className="panda-image"
            />


            {/* =========================
                CLICK TEXT
            ========================= */}

            <p className="click-text">
                Click anywhere
            </p>


            {/* =========================
                FLOATING SURPRISES
            ========================= */}

            {surprises.map((surprise) => (
                <div
                    key={surprise.id}
                    className="surprise"
                    style={{
                        left: surprise.x,
                        top: surprise.y,
                    }}
                >
                    {surprise.text}
                </div>
            ))}


            {/* =========================
                CONTINUE BUTTON
            ========================= */}

            <button
                className="birthday-continue-button"
                onClick={(event) => {
                    event.stopPropagation();
                    onNext();
                }}
            >
                Continue
            </button>

        </div>
    );
}

export default Birthday;

