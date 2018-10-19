export const radiansToDegrees = radians => ((radians * 180) / Math.PI);


export const angleKf = (point, angle) => {
    const k = Math.tan(angle * Math.PI / 180);
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
        if(angle < 0) {
            return - (180 - angle);
        }else{
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
    let pointCollision = {};
    let nearestPointCollision = false;
    let nearestBox = {};
    boxes.map(box => {
        pointCollision = boxCollision(box, point, currentAngle);
        if (pointCollision) {
            if (!nearestPointCollision) {
                nearestPointCollision = pointCollision;
                nearestBox = box;
            } else {
                if (distance(point, pointCollision) < distance(point, nearestPointCollision)) {
                    nearestPointCollision = pointCollision;
                    nearestBox = box;
                }
            }
        }
    });
    if (!nearestPointCollision) {
        return false;
    }
    return {box: nearestBox, point: nearestPointCollision};
};

export const boxCollision = (box, point, currentAngle) => {

    if( currentAngle >= - 180 && currentAngle <= -90){
        if( !(box.x2 > point.x && box.y2 > point.y) ){
            return false;
        }
    }else if(currentAngle >= - 90 && currentAngle <= 0){
        if( !(box.x1 < point.x && box.y2 > point.y) ){
            return false;
        }
    }else if(currentAngle >=  0 && currentAngle <= 90){
        if( !(box.x1 < point.x && box.y1 < point.y) ){
            return false;
        }
    }else{
        if( !(box.x2 > point.x && box.y1 < point.y) ){
            return false;
        }
    }
    if( point.x >= box.x1 && point.x <= box.x2
        && point.y >= box.y1 && point.y <= box.y2){
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
export const randomDoubleSeq = (size) => {
    return [...randomSingleSeq(size), ...randomSingleSeq(size)].reduce((seq, key) => {
        if (key in seq) {
            seq[key] += 1;
        } else {
            seq[key] = 1;
        }
        return seq;
    }, {});
};

export const calculateNextPosition = (x, y, angle, divisor = 300) => {
    const realAngle = angle - 90;
    const stepsX = radiansToDegrees(Math.sin(degreesToRadian(realAngle))) / divisor ;
    const stepsY = radiansToDegrees(Math.cos(degreesToRadian(realAngle))) / divisor ;
    return {
        x: x + stepsX,
        y: y - stepsY,
    }
};

export const calculateRaysRoute = (fromPosition, toPosition, playground, boxes, count = 20) => {
    let angle = 0;
    let point = fromPosition;
    const firstAngle = calcAngle(fromPosition, toPosition);
    let route = [ ];
    let endPoint = point;
    let boxCollisionItem = false;
    for (let key = 0; key < count; key++) {
        if (key === 0) {
            angle = firstAngle;
        } else {
            if (!boxCollisionItem) {
                angle = mirrorAngle({
                    x1:playground.topLeft.x,
                    x2:playground.topRight.x,
                    y1:playground.topRight.y,
                    y2:playground.bottomRight.y}, point, angle);
            }else{
                angle = mirrorAngle(boxCollisionItem.box, point, angle);
            }
        }
        boxCollisionItem =  boxesCollision(boxes, point, angle);
        if (!boxCollisionItem) {
            endPoint = borderCollision({
                x1: 0,
                x2: playground.bottomRight.x,
                y1: 0,
                y2: playground.bottomRight.y
            }, point, angle);
        }else{
            angle = calcAngle(endPoint,boxCollisionItem.point);
            endPoint = boxCollisionItem.point;
        }
        route.push({...point,angle});
        point = endPoint;
    }
    return route;
};

export const getBlockPositions = (playground) => {
    const countBlocksInRow = 7;
    const blockSize = Math.round(playground.topRight.x - playground.topLeft.x) / countBlocksInRow;
    const blocksInfo = randomDoubleSeq(countBlocksInRow);
    let blockPositions = {};
    for (let key in blocksInfo) {
        blockPositions[key] = {
            x1: blockSize * key,
            x2: blockSize * key + blockSize,
            y1: 100,
            y2: 100 + blockSize
        };
    }
    return {info:blocksInfo,positions:blockPositions};
};