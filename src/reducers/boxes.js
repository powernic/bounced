import {getBoxesRow} from "../utils/formula";
import {BOXES_INIT} from "../actions/GameActions";

const initialState =
    {
        board: Array(7).fill(Array(7).fill(0)),
        boxesPositions: [],
        config: {
            countBlocksInRow: 7,
            blockSize: 0,
        }
    };

const getNewBoard = (board, count, multiplier) => {
    const row = getBoxesRow(count, multiplier);
    let newBoard = [];
    newBoard.push(row);
    for (let i = 0; i < 6; i++) {
        newBoard.push(board[i]);
    }
    return newBoard;
};

const getBoxesPositions = (board, blockSize) => {
    let boxesPositions = [];
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] > 0) {
                boxesPositions.push({
                        x1: blockSize * j,
                        x2: blockSize * j + blockSize,
                        y1: blockSize * i,
                        y2: blockSize * i + blockSize,
                        board: {
                            row: i,
                            column: j
                        }
                    }
                );
            }
        }
    }
    return boxesPositions;
};

const boxesInit = (state, action) => {
    const blockSize = Math.round(action.payload.topRight.x - action.payload.topLeft.x) / state.config.countBlocksInRow;

    const board = getNewBoard(state.board, state.config.countBlocksInRow,
        action.payload.level);
    // let board = Array(7).fill(Array(7).fill(0));
    // board[0] = [1,0,2,1,1,1,1];
    return {
        ...state,
        board,
        boxesPositions: getBoxesPositions(board, blockSize),
        config: {
            ...state.config,
            blockSize
        }
    };
};

const touchBox = (state, action) => {
    const {boxesPositions, board} = state;
    const ind = action.payload;
    let newBoard = board.slice();
    const {row, column} = boxesPositions[ind].board;
    newBoard[row][column]--;
    if (newBoard[row][column] === 0) {
        let newPositions = boxesPositions.slice();
        newPositions.splice(ind, 1);
        return {...state, boxesPositions: newPositions, board: newBoard};
    } else {
        return {...state, board: newBoard};
    }
};

export function boxesReducer(state = initialState, action) {
    switch (action.type) {
        case 'BOXES_INIT':
            if (!action.payload) return state;
            return boxesInit(state, action);
        case 'ADD_BOXES_ROW':
            if (!action.payload) return state;
            const newBoard = getNewBoard(
                state.board,
                state.config.countBlocksInRow,
                action.payload.level);
            return {
                ...state,
                board: newBoard,
                boxesPositions: getBoxesPositions(newBoard, state.config.blockSize),
            };
        case 'TOUCH_BOX':
            if (!action.payload && action.payload !== 0) return state;
            return touchBox(state, action);
        default:
            return state
    }
}
