import "./Intro.css";

function Intro({ onNext }) {
    return (
        <div className="intro-page">

            {/* Stars */}
            <div className="stars stars-1"></div>
            <div className="stars stars-2"></div>
            <div className="stars stars-3"></div>
            <div className="stars stars-4"></div>

            {/* Shooting star */}
            <div className="shooting-star"></div>

            {/* Main content */}
            <div className="intro-content">

                <h1>Hi Steffy!</h1>

                <p>You ready?</p>

                <div className="intro-buttons">

                    <button onClick={onNext}>
                        <span>Yes!!</span>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 -960 960 960"
                            className="heart-icon"
                        >
                            <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z" />
                        </svg>
                    </button>

                    <button onClick={onNext}>
                        <span>Yeah!!</span>
                        <span className="ribbon">🎀</span>
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Intro;
