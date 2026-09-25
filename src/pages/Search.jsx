import { useState } from "react";
import "./Search.css";

const WORDS = [
    "SHORT",
    "TINYHANDS",
    "FOOTBALL",
    "FRIEDRICE",
    "BMW",
    "UNDERPANDA",
    "SPIDERMAN",
    "BROWNIE",
    "SIXPACK",
    "HOWTWHEELS",
    "VIJAY",
    "ENZO",
    "LEVIATHAN",
    "UNIVERSE",
];

const DISPLAY_WORDS = {
    TINYHANDS: "TINY HANDS",
    FRIEDRICE: "FRIED RICE",
    SIXPACK: "SIX PACK"
}

const GRID_SIZE = 13;

const WORD_COLORS = [
    "#ff6b9d",
    "#ffd166",
    "#7dd3fc",
    "#c4b5fd",
    "#86efac",
    "#fb923c",
    "#f472b6",
    "#67e8f9",
    "#fde68a",
    "#a7f3d0",
    "#c4b5fd",
    "#fca5a5",
    "#93c5fd",
    "#f9a8d4",
];

const getWordColor = (word) => {
    const index = WORDS.indexOf(word);

    if (index === -1) {
        return "#ffffff";
    }

    return WORD_COLORS[index % WORD_COLORS.length];
};

const DIRECTIONS = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
];

function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

function createPuzzle() {
    const words = [...WORDS].sort(
        (a, b) => b.length - a.length
    );

    for (let attempt = 0; attempt < 100; attempt++) {
        const grid = Array.from(
            { length: GRID_SIZE },
            () => Array(GRID_SIZE).fill(null)
        );

        const positions = {};
        let success = true;

        for (
            let wordIndex = 0;
            wordIndex < words.length;
            wordIndex++
        ) {
            const word = words[wordIndex];
            let placed = false;

            const preferredZones = [
                {
                    minRow: 0,
                    maxRow: 4,
                    minCol: 0,
                    maxCol: 5,
                },
                {
                    minRow: 0,
                    maxRow: 5,
                    minCol: 7,
                    maxCol: 12,
                },
                {
                    minRow: 4,
                    maxRow: 9,
                    minCol: 3,
                    maxCol: 9,
                },
                {
                    minRow: 7,
                    maxRow: 12,
                    minCol: 0,
                    maxCol: 5,
                },
                {
                    minRow: 7,
                    maxRow: 12,
                    minCol: 7,
                    maxCol: 12,
                },
            ];

            const preferredZone =
                preferredZones[
                    wordIndex % preferredZones.length
                ];

            let starts = [];

            for (let row = 0; row < GRID_SIZE; row++) {
                for (let col = 0; col < GRID_SIZE; col++) {
                    starts.push([row, col]);
                }
            }

            starts = shuffle(starts);

            starts.sort((a, b) => {
                const aInside =
                    a[0] >= preferredZone.minRow &&
                    a[0] <= preferredZone.maxRow &&
                    a[1] >= preferredZone.minCol &&
                    a[1] <= preferredZone.maxCol;

                const bInside =
                    b[0] >= preferredZone.minRow &&
                    b[0] <= preferredZone.maxRow &&
                    b[1] >= preferredZone.minCol &&
                    b[1] <= preferredZone.maxCol;

                if (aInside && !bInside) {
                    return -1;
                }

                if (!aInside && bInside) {
                    return 1;
                }

                return 0;
            });

            const directions = shuffle(DIRECTIONS);

            for (const [dr, dc] of directions) {
                if (placed) {
                    break;
                }

                for (const [startRow, startCol] of starts) {
                    const wordCells = [];
                    let valid = true;

                    for (let i = 0; i < word.length; i++) {
                        const row = startRow + dr * i;
                        const col = startCol + dc * i;

                        if (
                            row < 0 ||
                            row >= GRID_SIZE ||
                            col < 0 ||
                            col >= GRID_SIZE
                        ) {
                            valid = false;
                            break;
                        }

                        if (
                            grid[row][col] !== null &&
                            grid[row][col] !== word[i]
                        ) {
                            valid = false;
                            break;
                        }

                        wordCells.push([row, col]);
                    }

                    if (!valid) {
                        continue;
                    }

                    wordCells.forEach(
                        ([row, col], index) => {
                            grid[row][col] = word[index];
                        }
                    );

                    positions[word] = wordCells;
                    placed = true;
                    break;
                }
            }

            if (!placed) {
                success = false;
                break;
            }
        }

        if (!success) {
            continue;
        }

        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++) {
                if (!grid[row][col]) {
                    grid[row][col] =
                        String.fromCharCode(
                            65 +
                                Math.floor(
                                    Math.random() * 26
                                )
                        );
                }
            }
        }

        return {
            grid,
            positions,
        };
    }

    return createPuzzle();
}

function getCellsBetween(start, end) {
    if (!start || !end) {
        return [];
    }

    const rowDiff = end.row - start.row;
    const colDiff = end.col - start.col;

    const absRow = Math.abs(rowDiff);
    const absCol = Math.abs(colDiff);

    if (rowDiff === 0 && colDiff > 0) {
        const cells = [];

        for (
            let col = start.col;
            col <= end.col;
            col++
        ) {
            cells.push({
                row: start.row,
                col,
            });
        }

        return cells;
    }

    if (colDiff === 0 && rowDiff > 0) {
        const cells = [];

        for (
            let row = start.row;
            row <= end.row;
            row++
        ) {
            cells.push({
                row,
                col: start.col,
            });
        }

        return cells;
    }

    if (
        absRow === absCol &&
        rowDiff > 0 &&
        colDiff > 0
    ) {
        const cells = [];

        for (let i = 0; i <= absRow; i++) {
            cells.push({
                row: start.row + i,
                col: start.col + i,
            });
        }

        return cells;
    }

    if (
        absRow === absCol &&
        rowDiff > 0 &&
        colDiff < 0
    ) {
        const cells = [];

        for (let i = 0; i <= absRow; i++) {
            cells.push({
                row: start.row + i,
                col: start.col - i,
            });
        }

        return cells;
    }

    return [];
}

function Search({ onNext }) {
    const [puzzle] = useState(() => createPuzzle());

    const [showIntro, setShowIntro] = useState(true);

    const [startCell, setStartCell] = useState(null);

    const [currentSelection, setCurrentSelection] = useState([]);

    const [foundWords, setFoundWords] = useState([]);

    const [isSelecting, setIsSelecting] = useState(false);

    const [isGivingUp, setIsGivingUp] = useState(false);

    const [showGiveUpMessage, setShowGiveUpMessage] =
        useState(false);

    const startGame = () => {
        setShowIntro(false);
    };

    const handleGiveUp = () => {
        if (
            isGivingUp ||
            showGiveUpMessage ||
            foundWords.length === WORDS.length
        ) {
            return;
        }

        setIsGivingUp(true);

        setTimeout(() => {
            setIsGivingUp(false);
            setShowGiveUpMessage(true);
        }, 4000);
    };

    const getCellFromPointer = (event) => {
        const element = document.elementFromPoint(
            event.clientX,
            event.clientY
        );

        const cell = element?.closest(".word-cell");

        if (!cell) {
            return null;
        }

        return {
            row: Number(cell.dataset.row),
            col: Number(cell.dataset.col),
        };
    };

    const handlePointerDown = (event) => {
        if (
            showIntro ||
            isGivingUp ||
            showGiveUpMessage
        ) {
            return;
        }

        const cell = getCellFromPointer(event);

        if (!cell) {
            return;
        }

        event.currentTarget.setPointerCapture?.(
            event.pointerId
        );

        setStartCell(cell);
        setCurrentSelection([cell]);
        setIsSelecting(true);
    };

    const handlePointerMove = (event) => {
        if (
            !isSelecting ||
            !startCell ||
            isGivingUp ||
            showGiveUpMessage
        ) {
            return;
        }

        const cell = getCellFromPointer(event);

        if (!cell) {
            return;
        }

        const selection = getCellsBetween(
            startCell,
            cell
        );

        setCurrentSelection(selection);
    };

    const handlePointerUp = (event) => {
        if (!isSelecting) {
            return;
        }

        const selectedLetters =
            currentSelection
                .map(
                    ({ row, col }) =>
                        puzzle.grid[row][col]
                )
                .join("");

        if (
            WORDS.includes(selectedLetters) &&
            !foundWords.includes(selectedLetters)
        ) {
            setFoundWords((previous) => [
                ...previous,
                selectedLetters,
            ]);
        }

        setIsSelecting(false);
        setStartCell(null);
        setCurrentSelection([]);

        event.currentTarget.releasePointerCapture?.(
            event.pointerId
        );
    };

    const handlePointerCancel = (event) => {
        setIsSelecting(false);
        setStartCell(null);
        setCurrentSelection([]);

        event.currentTarget.releasePointerCapture?.(
            event.pointerId
        );
    };

    const isCurrentSelection = (row, col) => {
        return currentSelection.some(
            (cell) =>
                cell.row === row &&
                cell.col === col
        );
    };

    const getFoundWordForCell = (row, col) => {
        for (
            let i = foundWords.length - 1;
            i >= 0;
            i--
        ) {
            const word = foundWords[i];

            const isPartOfWord =
                puzzle.positions[word]?.some(
                    ([foundRow, foundCol]) =>
                        foundRow === row &&
                        foundCol === col
                );

            if (isPartOfWord) {
                return word;
            }
        }

        return null;
    };

    const getRevealedWordForCell = (row, col) => {
        if (!isGivingUp) {
            return null;
        }

        for (
            let i = WORDS.length - 1;
            i >= 0;
            i--
        ) {
            const word = WORDS[i];

            if (foundWords.includes(word)) {
                continue;
            }

            const isPartOfWord =
                puzzle.positions[word]?.some(
                    ([foundRow, foundCol]) =>
                        foundRow === row &&
                        foundCol === col
                );

            if (isPartOfWord) {
                return word;
            }
        }

        return null;
    };

    const completed =
        foundWords.length === WORDS.length;

    const leftWords = WORDS.slice(0, 7);
    const rightWords = WORDS.slice(7);

    if (showIntro) {
        return (
            <div className="word-search-page">

                <div className="word-search-intro">

                    <h1 className="word-search-title">
                        Everything I Love About the Birthday Girl
                    </h1>

                    <div className="intro-card">

                        <h2>
                            How to Play
                        </h2>

                        <p>
                            Find all 15 hidden words
                            about you!
                        </p>

                        <p>
                            Drag across the letters
                            to select a word.
                        </p>

                        <div className="direction-list">

                            <span>
                                → Left to right
                            </span>

                            <span>
                                ↓ Top to bottom
                            </span>

                            <span>
                                ↘ Diagonal
                            </span>

                            <span>
                                ↙ Diagonal
                            </span>

                        </div>

                        <div className="intro-buttons">

                            <button
                                className="primary-button"
                                onClick={startGame}
                            >
                                Let's go!
                            </button>

                            <button
                                className="secondary-button"
                                onClick={onNext}
                            >
                                Later
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        );
    }

    return (
        <div className="word-search-page">

            <div className="word-search-content">

                <h1 className="word-search-title">
                    Everything I Love About the Birthday Girl
                </h1>

                <div className="word-search-game">

                    <div className="word-list-container">

                        <h2>
                            Find These
                        </h2>

                        <div className="word-list">

                            {leftWords.map((word) => {
                                const found =
                                    foundWords.includes(word);

                                return (
                                    <div
                                        key={word}
                                        className={`word-item ${
                                            found
                                                ? "word-found"
                                                : ""
                                        }`}
                                        style={
                                            found
                                                ? {
                                                    "--word-color":
                                                        getWordColor(
                                                            word
                                                        ),
                                                }
                                                : {}
                                        }
                                    >

                                        {found && (
                                            <span className="check-mark">
                                                ✓
                                            </span>
                                        )}

                                        <span>
                                            {
                                                DISPLAY_WORDS[
                                                    word
                                                ] || word
                                            }
                                        </span>

                                    </div>
                                );
                            })}

                        </div>

                    </div>

                    <div className="word-search-center">

                        <div className="crossword-wrapper">

                            <div
                                className={`puzzle-area ${
                                    completed ||
                                    showGiveUpMessage
                                        ? "puzzle-finished"
                                        : ""
                                }`}
                            >

                                <div className="progress-section">

                                    <div className="progress-text">

                                        <span>
                                            Progress
                                        </span>

                                        <span>
                                            {foundWords.length} /{" "}
                                            {WORDS.length}
                                        </span>

                                    </div>

                                    <div className="progress-track">

                                        <div
                                            className="progress-fill"
                                            style={{
                                                width: `${
                                                    (foundWords.length /
                                                        WORDS.length) *
                                                    100
                                                }%`,
                                            }}
                                        />

                                    </div>

                                </div>

                                <div
                                    className="word-grid"
                                    onPointerDown={
                                        handlePointerDown
                                    }
                                    onPointerMove={
                                        handlePointerMove
                                    }
                                    onPointerUp={
                                        handlePointerUp
                                    }
                                    onPointerCancel={
                                        handlePointerCancel
                                    }
                                >

                                    {puzzle.grid.map(
                                        (row, rowIndex) =>
                                            row.map(
                                                (
                                                    letter,
                                                    colIndex
                                                ) => {

                                                    const foundWord =
                                                        getFoundWordForCell(
                                                            rowIndex,
                                                            colIndex
                                                        );

                                                    const revealedWord =
                                                        getRevealedWordForCell(
                                                            rowIndex,
                                                            colIndex
                                                        );

                                                    const activeWord =
                                                        foundWord ||
                                                        revealedWord;

                                                    const wordColor =
                                                        activeWord
                                                            ? getWordColor(
                                                                activeWord
                                                            )
                                                            : null;

                                                    return (
                                                        <div
                                                            key={`${rowIndex}-${colIndex}`}
                                                            className={`word-cell ${
                                                                isCurrentSelection(
                                                                    rowIndex,
                                                                    colIndex
                                                                )
                                                                    ? "selected"
                                                                    : ""
                                                            } ${
                                                                foundWord
                                                                    ? "found"
                                                                    : ""
                                                            } ${
                                                                revealedWord
                                                                    ? "revealed"
                                                                    : ""
                                                            }`}
                                                            data-row={
                                                                rowIndex
                                                            }
                                                            data-col={
                                                                colIndex
                                                            }
                                                            style={
                                                                wordColor
                                                                    ? {
                                                                        "--word-color":
                                                                            wordColor,
                                                                    }
                                                                    : {}
                                                            }
                                                        >
                                                            {letter}
                                                        </div>
                                                    );
                                                }
                                            )
                                    )}

                                </div>

                                {!completed &&
                                    !showGiveUpMessage && (
                                        <button
                                            className="give-up-button"
                                            onClick={handleGiveUp}
                                            disabled={isGivingUp}
                                        >
                                            {isGivingUp
                                                ? "Revealing..."
                                                : "Give Up"}
                                        </button>
                                    )}

                                {(completed ||
                                    showGiveUpMessage) && (
                                    <div className="puzzle-dialog-overlay">

                                        <div
                                            className={`puzzle-dialog ${
                                                completed
                                                    ? "success-dialog"
                                                    : "give-up-dialog"
                                            }`}
                                        >

                                            {completed ? (
                                                <>
                                                    <h2>
                                                        You found everything! 🎉
                                                    </h2>

                                                    <button
                                                        className="primary-button"
                                                        onClick={onNext}
                                                    >
                                                        Continue →
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <h2>
                                                        Try again next time! 💗
                                                    </h2>

                                                    <button
                                                        className="primary-button"
                                                        onClick={onNext}
                                                    >
                                                        Continue →
                                                    </button>
                                                </>
                                            )}

                                        </div>

                                    </div>
                                )}

                            </div>

                        </div>

                    </div>

                    <div className="word-list-container">

                        <h2>
                            Find These
                        </h2>

                        <div className="word-list">

                            {rightWords.map((word) => {
                                const found =
                                    foundWords.includes(word);

                                return (
                                    <div
                                        key={word}
                                        className={`word-item ${
                                            found
                                                ? "word-found"
                                                : ""
                                        }`}
                                        style={
                                            found
                                                ? {
                                                    "--word-color":
                                                        getWordColor(
                                                            word
                                                        ),
                                                }
                                                : {}
                                        }
                                    >

                                        {found && (
                                            <span className="check-mark">
                                                ✓
                                            </span>
                                        )}

                                        <span>
                                            {
                                                DISPLAY_WORDS[
                                                    word
                                                ] || word
                                            }
                                        </span>

                                    </div>
                                );
                            })}

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Search;
