// Tetris Game Logic

const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

// Create the board and initialize
const boardWidth = 10;
const boardHeight = 20;
let board = Array.from({ length: boardHeight }, () => Array(boardWidth).fill(0));

let currentPiece;
let currentPosition;
let score = 0;
let gameOver = false;

// Define Tetris pieces and their rotations
const pieces = [
    [[1, 1, 1, 1]],  // I
    [[1, 1, 1], [0, 1, 0]],  // T
    [[1, 1, 0], [0, 1, 1]],  // Z
    [[0, 1, 1], [1, 1, 0]],  // S
    [[1, 1], [1, 1]]  // O
];

// Function to generate a random piece
function generatePiece() {
    const type = pieces[Math.floor(Math.random() * pieces.length)];
    currentPiece = { shape: type, x: Math.floor(boardWidth / 2) - 1, y: 0 };
    if (collides(currentPiece)) gameOver = true;
}

// Collision detection
function collides(piece) {
    for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
            if (piece.shape[y][x] && (board[y + piece.y] && board[y + piece.y][x + piece.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

// Function to merge the piece into the board
function merge() {
    for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
            if (currentPiece.shape[y][x]) {
                board[y + currentPiece.y][x + currentPiece.x] = 1;
            }
        }
    }
}

// Clear lines
function clearLines() {
    for (let y = boardHeight - 1; y >= 0; y--) {
        if (board[y].every(cell => cell !== 0)) {
            board.splice(y, 1);
            board.unshift(Array(boardWidth).fill(0));
            score += 100;
        }
    }
}

// Game state management
function update() {
    if (gameOver) return;
    currentPiece.y++;
    if (collides(currentPiece)) {
        currentPiece.y--;
        merge();
        clearLines();
        generatePiece();
    }
}

// Render the game
function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Draw board and current piece (implementation not shown)
}

// Game loop
function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

// Start the game
generatePiece();
gameLoop();

