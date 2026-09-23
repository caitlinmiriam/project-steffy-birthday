import { useState } from "react";

import Intro from "./pages/Intro";
import Birthday from "./pages/Birthday";
import Game from "./pages/Game";
import Wishes from "./pages/Wishes";
import Search from "./pages/Search";
import Memories from "./pages/Memories";

import "./Navigation.css";
import "./App.css";

function App() {

    const [page, setPage] = useState("intro");
    const [navigationUnlocked, setNavigationUnlocked] = useState(false);

    const navigate = (nextPage) => {
        setPage(nextPage);
    };

    const unlockNavigation = () => {
        setNavigationUnlocked(true);
    };

    let currentPage;

    switch (page) {

        case "intro":
            currentPage = (
                <Intro
                    onNext={() => setPage("birthday")}
                />
            );
            break;

        case "birthday":
            currentPage = (
                <Birthday
                    onNext={() => setPage("game")}
                />
            );
            break;

        case "game":
            currentPage = (
                <Game
                    onNext={() => setPage("wishes")}
                />
            );
            break;

        case "wishes":
            currentPage = (
                <Wishes
                    onNext={() => setPage("search")}
                />
            );
            break;

        case "search":
            currentPage = (
                <Search
                    onNext={() => setPage("memories")}
                />
            );
            break;

        case "memories":
            currentPage = (
                <Memories
                    onFinished={unlockNavigation}
                />
            );
            break;

        default:
            currentPage = (
                <Intro
                    onNext={() => setPage("birthday")}
                />
            );
    }

    return (
        <div className="app">

            {/* =========================
                GLOBAL BACKGROUND
            ========================= */}

            <div className="global-stars">

                <div className="stars stars-1"></div>

                <div className="stars stars-2"></div>

                <div className="stars stars-3"></div>

                <div className="stars stars-4"></div>

                <div className="shooting-star"></div>

            </div>


            {/* =========================
                CURRENT PAGE
            ========================= */}

            <main className="app-content">

                {currentPage}

            </main>


            {/* =========================
                NAVIGATION
            ========================= */}

            {navigationUnlocked && (
                <nav className="navigation-bar">

                    <button onClick={() => navigate("intro")}>
                        <span className="material-symbols-outlined">
                            home
                        </span>
                    </button>

                    <button onClick={() => navigate("birthday")}>
                        <span className="material-symbols-outlined">
                            cake
                        </span>
                    </button>

                    <button onClick={() => navigate("game")}>
                        <span className="material-symbols-outlined">
                            sports_esports
                        </span>
                    </button>

                    <button onClick={() => navigate("wishes")}>
                        <span className="material-symbols-outlined">
                            mail
                        </span>
                    </button>

                    <button onClick={() => navigate("search")}>
                        <span className="material-symbols-outlined">
                            search
                        </span>
                    </button>

                    <button onClick={() => navigate("memories")}>
                        <span className="material-symbols-outlined">
                            favorite
                        </span>
                    </button>

                </nav>
            )}

        </div>
    );
}

export default App;