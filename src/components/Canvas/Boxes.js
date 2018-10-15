import React from 'react';
import {Svg} from "expo";
import {getRandomSeq} from "../../utils/formula";

const Boxes = (props) => {
    const playground = props.playground;
    const countBlocksInRow = 7;
    const blockSize = Math.round(playground.topRight.x - playground.topLeft.x) / countBlocksInRow;
    let randCount1 = Math.floor(Math.random() * countBlocksInRow);
    let randCount2 = Math.floor(Math.random() * countBlocksInRow);
    if (randCount1 > 0) {
        randCount1--;
    }
    if (randCount2 > 0) {
        randCount2--;
    }
    let blocks1 = [], blocks2 = [];
    if (randCount1 > 0) {
        blocks1 = getRandomSeq(randCount1);
    }
    if (randCount2 > 0) {
        blocks2 = getRandomSeq(randCount2);
    }
    const blocksInfo = [...blocks1, ...blocks2].reduce((seq, key) => {
        if (key in seq) {
            seq[key] += 1;
        } else {
            seq[key] = 1;
        }
        return seq;
    }, {});

    let blocks = [];
    blocks.push(
    );
    let key;
    for (key in blocksInfo) {
        blocks.push(
            <Svg.Rect key={"rect."+key}
                      x={blockSize * key}
                      y="100"
                      rx="0" ry="0"
                      stroke="#fff"
                      strokeWidth="2"
                      width={blockSize}
                      height={blockSize}
                      fill="url(#grad)"/>
        );
        blocks.push(<Svg.Text key={"text."+key}
            fill="none"
            stroke="#fff"
            fontSize="20"
            fontWeight="bold"
            x={Math.round(blockSize * (key))+15}
            y={Math.round(100+blockSize/2)+5}>
            33</Svg.Text>);
    }
    blocks.push(
    <Svg.Defs key="grad">
        <Svg.LinearGradient id="grad" x1="0" y1="0" x2={blockSize} y2="0">
            <Svg.Stop offset="0" stopColor={'#59ff00'} stopOpacity="1" />
            <Svg.Stop offset="1" stopColor={'#2834ff'} stopOpacity="1" />
        </Svg.LinearGradient>
    </Svg.Defs>);
    return blocks;
};

export default Boxes;