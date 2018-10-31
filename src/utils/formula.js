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

export const mirrorAngleBox = (box, point, angle, radius = 10) => {
    return mirrorAngle({
        x1: box.x1 - radius,
        x2: box.x2 + radius,
        y1: box.y1 - radius,
        y2: box.y2 + radius,
    }, point, angle);
};
export const mirrorAnglePlayground = (box, point, angle, radius = 10) => {
    return mirrorAngle({
        x1: box.x1 + radius,
        x2: box.x2 - radius,
        y1: box.y1 + radius,
        y2: box.y2 - radius,
    }, point, angle);
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

export const borderCollision = (box, point, currentAngle, radius = 10) => {
    const rayKf = angleKf(point, currentAngle);
    let points = [];
    if (currentAngle <= 90 && currentAngle >= 0) {
        points = [
            {
                x: (radius - rayKf.b) / rayKf.k,
                y: box.y1 + radius
            },
            {
                x: box.x1 + radius,
                y: rayKf.k * radius + rayKf.b
            }
        ];
    } else if (currentAngle <= 0 && currentAngle >= -90) {
        points = [
            {
                x: box.x1 + radius,
                y: rayKf.k * radius + rayKf.b
            },
            {
                x: (box.y2 - radius - rayKf.b) / (rayKf.k),
                y: box.y2 - radius
            }
        ];
    } else if (currentAngle <= -90 && currentAngle >= -180) {
        points = [
            {
                x: (box.y2 - radius - rayKf.b) / (rayKf.k),
                y: box.y2 - radius
            },
            {
                x: box.x2 - radius,
                y: rayKf.k * (box.x2 - radius) + rayKf.b
            }

        ];
    } else {
        points = [
            {
                x: (radius - rayKf.b) / rayKf.k,
                y: box.y1 + radius
            },
            {
                x: box.x2 - radius,
                y: rayKf.k * (box.x2 - radius) + rayKf.b
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
export const getNearestPoint = (point, targetPoint1, targetPoint2) => {
    if (distance(point, targetPoint1) < distance(point, targetPoint2)) {
        return targetPoint1;
    } else {
        return targetPoint2;
    }
};

export const getCorner = (box, point) => {
    switch (point.edge) {
        case 'bottom':
            return getNearestPoint(point, {x: box.x1, y: box.y2}, {x: box.x2, y: box.y2});
        case 'top':
            return getNearestPoint(point, {x: box.x1, y: box.y1}, {x: box.x2, y: box.y1});
        case 'left':
            return getNearestPoint(point, {x: box.x1, y: box.y1}, {x: box.x1, y: box.y2});
        case 'right':
            return getNearestPoint(point, {x: box.x2, y: box.y1}, {x: box.x2, y: box.y2});
    }
};

export const circleToBoxCollision = (box, point, angle, radius = 10) => {
    let toPoint = boxCollision({
        x1: box.x1 - radius,
        x2: box.x2 + radius,
        y1: box.y1 - radius,
        y2: box.y2 + radius
    }, point, angle);
    if (!toPoint) {
        return false;
    }
    if ((toPoint.x <= box.x1 && toPoint.x >= box.x1 - radius
        && toPoint.y >= box.y2 && toPoint.y <= box.y2 + radius)
        || (toPoint.x <= box.x1 && toPoint.x >= box.x1 - radius
            && toPoint.y <= box.y1 && toPoint.y >= box.y1 - radius)
        || (toPoint.x >= box.x2 && toPoint.x <= box.x2 + radius
            && toPoint.y <= box.y1 && toPoint.y >= box.y1 - radius)
        || (toPoint.x >= box.x2 && toPoint.x <= box.x2 + radius
            && toPoint.y >= box.y2 && toPoint.y <= box.y2 + radius)) {

        const corner = getCorner(box, toPoint);

        const tan = Math.tan(degreesToRadian(angle));
        const b = point.y - tan * point.x;
        const x = corner.x;
        const y = corner.y;
        const A = 1 + tan * tan;
        const B = 2 * (b * tan - x - y * tan);
        const C = x * x + y * y - radius * radius + b * b - 2 * y * b;
        const D = B * B - 4 * A * C;
        if (D < 0) {
            return false;
        }
        const x21 = (-B + Math.sqrt(D)) / (2 * A);
        const y21 = tan * x21 + b;

        const x22 = (-B - Math.sqrt(D)) / (2 * A);
        const y22 = tan * x22 + b;

        const point1 = {x: x21, y: y21};
        const point2 = {x: x22, y: y22};

        if (distance(point, point1) < distance(point, point2)) {
            point1.angle = radiansToDegrees(Math.atan2(point1.x - x,point1.y - y));
            return point1;
        } else {
            point2.angle = radiansToDegrees(Math.atan2(point2.x - x,point2.y - y));
            return point2;
        }
    } else {
        return {x: toPoint.x, y: toPoint.y};
    }

};

export const boxesCollision = (boxes, point, currentAngle) => {
    let nearestPointCollision = false;
    let nearestBox = {};
    let boxInd;
    for (let ind = 0; ind < boxes.length; ind++) {
        let box = boxes[ind];
        let pointCollision = {};
        pointCollision = circleToBoxCollision(box, point, currentAngle);
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


/**
 *
 * @param box {{x1,x2,y1,y2}}
 * @param point {{x,y}}
 * @param currentAngle {Number} Angle in degrees
 * @returns {{x,y,edge}} Collision point
 *
 */
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
        points.push({...top, edge: 'top'});
    }
    let bottom = {
        x: (box.y2 - rayKf.b) / (rayKf.k),
        y: box.y2
    };

    if (bottom.x >= box.x1 && bottom.x <= box.x2) {
        points.push({...bottom, edge: 'bottom'});
    }
    let left = {
        x: box.x1,
        y: rayKf.k * box.x1 + rayKf.b
    };

    if (left.y >= box.y1 && left.y <= box.y2) {
        points.push({...left, edge: 'left'});
    }
    let right = {
        x: box.x2,
        y: rayKf.k * box.x2 + rayKf.b
    };
    if (right.y >= box.y1 && right.y <= box.y2) {
        points.push({...right, edge: 'right'});
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
    const {board, boxesPositions} = boxes;
    let route = [];
    let endPoint = point;
    let boxCollisionItem;
    let type = 'playground';
    let boxInd = '';
    let prevType = '';
    let prev2Type = '';
    angle = firstAngle;
    let i = 0;
    while (true) {
        i++;
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
        if (prev2Type === 'box' && boxInd !== null) {
            const currentEl = boxesPositions[boxInd].board;
            if (boxes.board[currentEl.row][currentEl.column] < 2) {
                break;
            }
        }
        prev2Type = prevType;
        prevType = type;
        point = endPoint;
        if (!boxCollisionItem) {
            angle = mirrorAnglePlayground({
                x1: playground.topLeft.x,
                x2: playground.topRight.x,
                y1: playground.topRight.y,
                y2: playground.bottomRight.y
            }, point, angle);
        } else {
            if ('angle' in boxCollisionItem.point) {
                angle = -boxCollisionItem.point.angle - 90;
            }else{
                angle = mirrorAngleBox(boxCollisionItem.box, point, angle);
            }
        }
        if (i > 225) {
            break;
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