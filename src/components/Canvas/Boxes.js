import React from 'react';
import {Svg} from "expo";
import {randomDoubleSeq} from "../../utils/formula";

const Boxes = (props) => {
    const {boxes} = props;
    const {boxesPositions, board, config} = boxes;
    let blocks = [];
    for (let i = 0; i < boxesPositions.length; i++) {
        blocks.push(
            <Svg.Rect key={"rect." + i}
                      x={boxesPositions[i].x1}
                      y={boxesPositions[i].y1}
                      rx="0" ry="0"
                      stroke="#fff"
                      strokeWidth="2"
                      width={config.blockSize}
                      height={config.blockSize}
                      fill="url(#grad)"/>
        );
    }
    /*'#' + (Math.random().toString(16) + "000000").substring(2,8)*/
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            const block = board[i][j];
            if (block === 0) continue;
            blocks.push(<Svg.Text key={"text." + i + "-" + j}
                                  fill="none"
                                  stroke="#fff"
                                  fontSize="20"
                                  fontWeight="bold"
                                  x={Math.round(config.blockSize * (j)) + 15}
                                  y={Math.round(i * config.blockSize + config.blockSize / 2) + 5}>
                {block}</Svg.Text>);
        }
    }
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