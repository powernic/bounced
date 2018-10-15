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

export const mirrorAngle = (playground, point, angle) => {

    if (point.y === playground.topLeft.y || point.y === playground.bottomLeft.y) {
        return -angle;
    } else if (point.x === playground.topLeft.x || point.x === playground.topRight.x) {
        if (angle < 0) {
            return -(180 + angle);
        } else {
            return 180 - angle;
        }
    }
}

export const borderCollision = (playground, point, currentAngle) => {
    const rayKf = angleKf(point, currentAngle);
    let points = [];

    if (currentAngle <= 90 && currentAngle >= 0) {
        points = [
            {
                x: -rayKf.b / rayKf.k,
                y: 0
            },
            {
                x: 0,
                y: rayKf.b
            }
        ];
    } else if (currentAngle <= 0 && currentAngle >= -90) {
        points = [
            {
                x: 0,
                y: rayKf.b
            },
            {
                x: (playground.bottomLeft.y - rayKf.b) / (rayKf.k),
                y: playground.bottomLeft.y
            }
        ];
    } else if (currentAngle <= -90 && currentAngle >= -180) {
        points = [
            {
                x: (playground.bottomLeft.y - rayKf.b) / (rayKf.k),
                y: playground.bottomLeft.y
            },
            {
                x: playground.topRight.x,
                y: rayKf.k * playground.topRight.x + rayKf.b
            }

        ];
    } else {
        points = [
            {
                x: -rayKf.b / rayKf.k,
                y: 0
            },
            {
                x: playground.topRight.x,
                y: rayKf.k * playground.topRight.x + rayKf.b
            }
        ];
    }

    const dist1 = Math.sqrt(Math.pow(point.x - points[0].x, 2) + Math.pow(point.y - points[0].y, 2));
    const dist2 = Math.sqrt(Math.pow(point.x - points[1].x, 2) + Math.pow(point.y - points[1].y, 2));
    if (dist1 <= dist2) {
        return points[0];
    } else {
        return points[1];
    }
};

export const getRandomSeq = count => {
    let seq = [...Array(count).keys()];
    for (let i = seq.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let tmp = seq[i];
        seq[i] = seq[j];
        seq[j] = tmp;
    }
    return seq;
}