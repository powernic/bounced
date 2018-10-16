import React from 'react';
import {Svg} from "expo";
import {randomDoubleSeq} from "../../utils/formula";

const Boxes = (props) => {
    const {playground,setBoxes} = props;
    const countBlocksInRow = 7;
    const blockSize = Math.round(playground.topRight.x - playground.topLeft.x) / countBlocksInRow;
    let blocks = [];
    const blocksInfo = randomDoubleSeq(countBlocksInRow);
    let blockPositions = [];
    for (let key in blocksInfo) {
        blocks.push(
            <Svg.Rect key={"rect." + key}
                      x={blockSize * key}
                      y="100"
                      rx="0" ry="0"
                      stroke="#fff"
                      strokeWidth="2"
                      width={blockSize}
                      height={blockSize}
                      fill="url(#grad)"/>
        );
        blockPositions.push({
            x1: blockSize * key,
            x2: blockSize * key + blockSize,
            y1: 100,
            y2: 100 + blockSize
        });
        blocks.push(<Svg.Text key={"text." + key}
                              fill="none"
                              stroke="#fff"
                              fontSize="20"
                              fontWeight="bold"
                              x={Math.round(blockSize * (key)) + 15}
                              y={Math.round(100 + blockSize / 2) + 5}>
            {blocksInfo[key]}</Svg.Text>);
    }
    blocks.push(
        <Svg.Defs key="grad">
            <Svg.LinearGradient id="grad" x1="0" y1="0" x2={blockSize} y2="0">
                <Svg.Stop offset="0" stopColor={'#59ff00'} stopOpacity="1"/>
                <Svg.Stop offset="1" stopColor={'#2834ff'} stopOpacity="1"/>
            </Svg.LinearGradient>
        </Svg.Defs>);
    setBoxes(blockPositions);
    return blocks;
};

export default Boxes;