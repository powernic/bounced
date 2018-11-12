import React from 'react';
import {Svg} from "expo";
import {BOARD_POINT} from "../../utils/constants";

const Boxes = (props) => {
    const {boxes} = props;
    const {boxesPositions, board, config} = boxes;
    let blocks = [];

    const showBlock = (blocks, blockPos, block, row, column, config,i) => {
        blocks.push(
            <Svg.Rect key={"rect." + i}
                      x={blockPos.x1}
                      y={blockPos.y1}
                      rx="0" ry="0"
                      stroke="#fff"
                      strokeWidth="2"
                      width={config.blockSize}
                      height={config.blockSize}
                      fill="url(#grad)"/>
        );
        blocks.push(<Svg.Text key={"text." + i }
                              fill="none"
                              stroke="#fff"
                              fontSize="20"
                              fontWeight="bold"
                              x={Math.round(config.blockSize * (column)) + 15}
                              y={Math.round(row * config.blockSize + config.blockSize / 2) + 5}>
            {block}</Svg.Text>);
    };

    const showPoint = (blocks, blockPos, block, row, column, config,i) => {
        blocks.push(
            <Svg.Circle key={"circle." + i}
                      cx={blockPos.x1+config.blockSize/2}
                      cy={blockPos.y1+config.blockSize/2}
                      r={config.blockSize/2}
                      stroke="#fff"
                      strokeWidth="2"
                      fill="url(#grad)"/>);
    };

    for (let i = 0; i < boxesPositions.length; i++) {
        const blockPos = boxesPositions[i];
        const {column, row} = blockPos.board;
        const block = board[row][column];
        let showFunction = showBlock;
        switch (block) {
            case BOARD_POINT:
                showFunction = showPoint;
                break;
        }
        showFunction(blocks, blockPos, block, row, column, config,i);
    }
    /*'#' + (Math.random().toString(16) + "000000").substring(2,8)*/
    blocks.push(
        <Svg.Defs key="grad">
            <Svg.LinearGradient id="grad" x1="0" y1="0" x2={config.blockSize} y2="0">
                <Svg.Stop offset="0" stopColor={'#59ff00'} stopOpacity="1"/>
                <Svg.Stop offset="1" stopColor={'#2834ff'} stopOpacity="1"/>
            </Svg.LinearGradient>
        </Svg.Defs>);
    return blocks;
};

export default Boxes;