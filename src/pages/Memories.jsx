import { useState } from "react";
import "./Memories.css";

const introMessage = `I was about to do AI-generated images. But you know data centres use a lot of water. So I scrapped that plan (the panda with the cake - I drew it myself). Instead here are some memories of us that I adore and relive whenever I think about you. Give them a like if you feel the same way too.`;

const memories = [
    `Our first conversation when you said, "It's 'STEPHY'. Not 'STEFFY'". But in the end I loved Steffyyy more.`,
    `The time when I painted your nails pink. By the way I would love to paint your nails again.`,
    `The night you DJed. Trust me I was and am still you number one fan.`,
    `The day you tripped over a kid at school. Me and the kid are really good friends now. His name is Stiago.`,
    `How we met at Juan's first holy communion. We hadn't talked in almost 2 weeks and I was so excited and happy to see you even though I might not have seemed like it.`,
    `How we are next to each other in all our friend group photos.`,
    `How I found you in our class photo from LKG. I can't even explain how excited I was. I literally told everyone. (I still tell everyone).`,
    `How we laughed about Nickson's eviction from Bigg Boss on WhatsApp while watching it from our homes.`,
    `The first time I told you I liked you. On Snapchat. That was the first time I ever told someone I liked them and I really meant it.`,
    `You never called me Caitlin. From the very first day. You have always called me KT from the very beginning which I absolutely adore.`
];

function Memories({ onFinished }) {
    const [started, setStarted] = useState(false);
    const [activeMemory, setActiveMemory] = useState(null);
    const [visitedMemories, setVisitedMemories] = useState([]);
    const [likedMemories, setLikedMemories] = useState([]);

    const openMemory = (index) => {
        setActiveMemory(index);

        if (!visitedMemories.includes(index)) {
            setVisitedMemories((previous) => [...previous, index]);
        }
    };

    const likeMemory = (index) => {
        setLikedMemories((previous) => {
            if (previous.includes(index)) {
                return previous.filter((item) => item !== index);
            }

            return [...previous, index];
        });
    };

    const finishMemories = () => {
        setActiveMemory(null);

        setTimeout(() => {
            onFinished();
        }, 700);
    };

    if (!started) {
        return (
            <div className="memories-page">
                <h1 className="memories-title">DOWN THE LANE</h1>

                <div className="memories-intro">
                    <p>{introMessage}</p>

                    <button
                        className="memories-start-button"
                        onClick={() => setStarted(true)}
                    >
                        START
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="memories-page">
            <h1 className="memories-title">Down the Lane</h1>

            <div className="memories-cards">
                {memories.map((memory, index) => {
                    const isActive = activeMemory === index;
                    const isVisited = visitedMemories.includes(index);
                    const isLiked = likedMemories.includes(index);

                    return (
                        <div
                            key={index}
                            className={`memory-card-wrapper memory-position-${index + 1} ${
                                isActive ? "memory-active" : ""
                            } ${isVisited ? "memory-visited" : ""}`}
                        >
                            <div
                                className="memory-card"
                                onClick={() => openMemory(index)}
                            >
                                <div className="memory-card-inner">

                                    <div className="memory-card-front">
                                        <span className="memory-heart">
                                            {isVisited ? "♥" : "♡"}
                                        </span>
                                    </div>

                                    <div className="memory-card-back">
                                        <p>{memory}</p>

                                        {isActive && (
                                            <div className="memory-actions">
                                                <button
                                                    className={`memory-like-button ${
                                                        isLiked ? "liked" : ""
                                                    }`}
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        likeMemory(index);
                                                    }}
                                                >
                                                    {isLiked ? "♥" : "♡"}
                                                </button>
                                            </div>
                                        )}

                                    </div>

                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {visitedMemories.length === memories.length && (
                <button
                    className="memories-done-button"
                    onClick={finishMemories}
                >
                    DONE
                </button>
            )}
        </div>
    );
}

export default Memories;