import { useState } from "react";
import "./Wishes.css";
import letterImage from "../assets/letter.png";

function Wishes({ onNext }) {
    const [opened, setOpened] = useState(false);
    const [shaking, setShaking] = useState(false);
    const [showLetter, setShowLetter] = useState(false);
    const [showPoof, setShowPoof] = useState(false);

    const handleOpen = () => {
        if (opened || shaking) return;

        setShaking(true);

        // Shake the closed envelope
        setTimeout(() => {
            setShaking(false);
            setOpened(true);
        }, 700);

        // Soft white page-wide poof
        setTimeout(() => {
            setShowPoof(true);
        }, 720);

        // Fade the poof away
        setTimeout(() => {
            setShowPoof(false);
        }, 1150);

        // Letter appears after the poof
        setTimeout(() => {
            setShowLetter(true);
        }, 1100);
    };

    return (
        <div className="wishes-page">

            {!opened && (
                <div
                    className="wishes-envelope-container"
                    onClick={handleOpen}
                >
                    <img
                        src={letterImage}
                        alt="Birthday envelope"
                        className={`wishes-envelope-image ${
                            shaking ? "wishes-envelope-shake" : ""
                        }`}
                    />

                    <p className="wishes-open-text">
                        Open me 🎀
                    </p>
                </div>
            )}

            {opened && (
                <div className="wishes-opened-scene">

                    <div className="wishes-confetti">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    {showPoof && (
                        <div className="wishes-white-poof"></div>
                    )}

                    {showLetter && (
                        <div className="wishes-letter-wrapper">

                            <div className="wishes-greeting-card">

                                <div className="wishes-card-decoration">
                                    ✨ ❤️ ✨
                                </div>

                                <h1>
                                    Happy Birthday Steffy! 🎂
                                </h1>

                                <p>
                                    Happy 20th birthday Steffyyyy! 🥳
                                </p>

                                <p>
                                    I wish you many, many, many more happy
                                    returns of the day!
                                </p>

                                <p>
                                    I pray that you receive lots of happiness,
                                    love, and success this year.
                                </p>

                                <p>
                                    I hope you stay happy, healthy, and safe
                                    at all times.
                                </p>

                                <p>
                                    Have lots of fun! 
                                </p>

                                <p>
                                    Live your life happily while still being
                                    close to God.
                                </p>

                                <p>
                                    May God and His people bless you and your
                                    loved ones. 
                                </p>

                                <p>
                                    Enjoy this day with your lovely people.
                                </p>

                                <p>
                                    Love you lots &lt;3
                                </p>

                                <p>
                                    Kt
                                </p>

                            </div>

                            <button
                                className="wishes-continue-button"
                                onClick={onNext}
                            >
                                Continue 🎀
                            </button>

                        </div>
                    )}

                </div>
            )}
        </div>
    );
}

export default Wishes;

