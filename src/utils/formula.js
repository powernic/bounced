export const radiansToDegrees = radians => ((radians * 180) / Math.PI);
const degreesToRadian = degrees => ((degrees * Math.PI) / 180);


export const angleKf = (point, angle) => {
    const k = Math.tan(degreesToRadian(angle));
    return {
        k: k,
        b: -k * point.x + point.y
    };
};

export const angleKfPoint = (point1, point2) => {
    const diffY = (point2.y - point1.y);
    const diffX = (point2.x - point1.x);
    if (diffX === 0) {
        return false;
    }
    const div = diffY / diffX;
    const k = div;
    const b = -div * point1.x + point1.y;
    return {k: k, b: b};
};

export const calcAngle = (point1, point2) => {
    return radiansToDegrees(Math.atan2(point1.y - point2.y, point1.x - point2.x));
};

export const mirrorAngle = (box, point, angle) => {

    if (point.y === box.y1 || point.y === box.y2) {
        return -angle;
    } else if (point.x === box.x1 || point.x === box.x2) {
        if (angle < 0) {
            return -(180 + angle);
        } else {
            return 180 - angle;
        }
    }
}

export const borderCollision = (box, point, currentAngle) => {
    const rayKf = angleKf(point, currentAngle);
    let points = [];
    if (currentAngle <= 90 && currentAngle >= 0) {
        points = [
            {
                x: -rayKf.b / rayKf.k,
                y: box.y1
            },
            {
                x: box.x1,
                y: rayKf.b
            }
        ];
    } else if (currentAngle <= 0 && currentAngle >= -90) {
        points = [
            {
                x: box.x1,
                y: rayKf.b
            },
            {
                x: (box.y2 - rayKf.b) / (rayKf.k),
                y: box.y2
            }
        ];
    } else if (currentAngle <= -90 && currentAngle >= -180) {
        points = [
            {
                x: (box.y2 - rayKf.b) / (rayKf.k),
                y: box.y2
            },
            {
                x: box.x2,
                y: rayKf.k * box.x2 + rayKf.b
            }

        ];
    } else {
        points = [
            {
                x: -rayKf.b / rayKf.k,
                y: box.y1
            },
            {
                x: box.x2,
                y: rayKf.k * box.x2 + rayKf.b
            }
        ];
    }

    if (distance(point, points[0]) <= distance(point, points[1])) {
        return points[0];
    } else {
        return points[1];
    }
};

export const distance = (point1, point2) => {
    return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
};

export const boxesCollision = (boxes, point, currentAngle) => {
    let nearestPointCollision = false;
    let nearestBox = {};
    let boxInd;
    for (let ind = 0; ind < boxes.length; ind++) {
        let box = boxes[ind];
        let pointCollision = {};
        pointCollision = boxCollision(box, point, currentAngle);
        if (pointCollision) {
            if (!nearestPointCollision) {
                nearestPointCollision = pointCollision;
                nearestBox = box;
                boxInd = ind;
            } else {
                if (distance(point, pointCollision) < distance(point, nearestPointCollision)) {
                    nearestPointCollision = pointCollision;
                    nearestBox = box;
                    boxInd = ind;
                }
            }
        }
    }
    ;
    if (!nearestPointCollision) {
        return false;
    }
    return {box: nearestBox, point: nearestPointCollision, boxInd};
};

export const boxCollision = (box, point, currentAngle) => {

    if (currentAngle >= -180 && currentAngle <= -90) {
        if (!(box.x2 > point.x && box.y2 > point.y)) {
            return false;
        }
    } else if (currentAngle >= -90 && currentAngle <= 0) {
        if (!(box.x1 < point.x && box.y2 > point.y)) {
            return false;
        }
    } else if (currentAngle >= 0 && currentAngle <= 90) {
        if (!(box.x1 < point.x && box.y1 < point.y)) {
            return false;
        }
    } else {
        if (!(box.x2 > point.x && box.y1 < point.y)) {
            return false;
        }
    }
    if (point.x >= box.x1 && point.x <= box.x2
        && point.y >= box.y1 && point.y <= box.y2) {
        return false;
    }
    const rayKf = angleKf(point, currentAngle);
    let points = [];

    let top = {
        x: (box.y1 - rayKf.b) / (rayKf.k),
        y: box.y1
    };

    if (top.x >= box.x1 && top.x <= box.x2) {
        points.push(top);
    }
    let bottom = {
        x: (box.y2 - rayKf.b) / (rayKf.k),
        y: box.y2
    };

    if (bottom.x >= box.x1 && bottom.x <= box.x2) {
        points.push(bottom);
    }
    let left = {
        x: box.x1,
        y: rayKf.k * box.x1 + rayKf.b
    };

    if (left.y >= box.y1 && left.y <= box.y2) {
        points.push(left);
    }
    let right = {
        x: box.x2,
        y: rayKf.k * box.x2 + rayKf.b
    };
    if (right.y >= box.y1 && right.y <= box.y2) {
        points.push(right);
    }
    if (points.length === 0) {
        return false;
    } else {
        const dist1 = Math.sqrt(Math.pow(point.x - points[0].x, 2) + Math.pow(point.y - points[0].y, 2));
        const dist2 = Math.sqrt(Math.pow(point.x - points[1].x, 2) + Math.pow(point.y - points[1].y, 2));
        if (dist1 <= dist2) {
            return points[0];
        } else {
            return points[1];
        }
    }
};

export const getRandomSeq = (length, count) => {
    let seq = [...Array(length).keys()];
    for (let i = 0; i < length - count; i++) {
        let j = Math.floor(Math.random() * (length - i));
        seq.splice(seq.indexOf(j), 1);
    }
    return seq;
};
export const randomSingleSeq = (size) => {
    let randCount = Math.floor(Math.random() * size);
    if (randCount > 0) {
        randCount--;
        return getRandomSeq(size, randCount);
    }
    return [];
};
export const randomDoubleSeq = (size, multiplier = 1) => {
    return [...randomSingleSeq(size), ...randomSingleSeq(size)].reduce((seq, key) => {
        if (key in seq) {
            seq[key] *= 2;
        } else {
            seq[key] = multiplier;
        }
        return seq;
    }, {});
};

export const calculateNextPosition = (x, y, angle, divisor = 300) => {
    const realAngle = angle - 90;
    const stepsX = radiansToDegrees(Math.sin(degreesToRadian(realAngle))) / divisor;
    const stepsY = radiansToDegrees(Math.cos(degreesToRadian(realAngle))) / divisor;
    return {
        x: x + stepsX,
        y: y - stepsY,
    }
};

export const calculateRaysRoute = (fromPosition, toPosition, playground, boxes) => {
    let angle = 0;
    let point = fromPosition;
    const firstAngle = calcAngle(fromPosition, toPosition);
    const {board, boxesPositions} = boxes
    let route = [];
    let endPoint = point;
    let boxCollisionItem = false;
    let type = 'playground';
    let boxInd = '';
    let prevType = '';
    let prev2Type = '';
    angle = firstAngle;
    while (true) {
        boxCollisionItem = boxesCollision(boxesPositions, point, angle);
        if (!boxCollisionItem) {
            endPoint = borderCollision({
                x1: 0,
                x2: playground.bottomRight.x,
                y1: 0,
                y2: playground.bottomRight.y
            }, point, angle);
            type = 'playground';
            boxInd = null;
        } else {
            angle = calcAngle(endPoint, boxCollisionItem.point);
            endPoint = boxCollisionItem.point;
            type = 'box';
            boxInd = boxCollisionItem.boxInd;
        }
        route.push({...point, angle, type, boxInd});
        if (point.y > 600) {
            break;
        }
        /*
        if (prev2Type === 'box' && boxInd !== null) {
            const currentEl = boxesPositions[boxInd].board;
            if(boxes.board[currentEl.row][currentEl.column] < 2){
                break;
            }
        }*/
        prev2Type = prevType;
        prevType = type;
        point = endPoint;
        if (!boxCollisionItem) {
            angle = mirrorAngle({
                x1: playground.topLeft.x,
                x2: playground.topRight.x,
                y1: playground.topRight.y,
                y2: playground.bottomRight.y
            }, point, angle);
        } else {
            angle = mirrorAngle(boxCollisionItem.box, point, angle);
        }
    }
    return route;
};

export const getBoxesRow = (count, multiplier) => {
    const blocksInfo = randomDoubleSeq(count, multiplier);
    let row = Array(count).fill(0);
    for (let key in blocksInfo) {
        row[key] = blocksInfo[key];
    }
    return row;
};