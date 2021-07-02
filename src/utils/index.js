const pointInPolygon = require('point-in-polygon')

const scaler = (data) => {
    var maxX,
        maxY,
        xFactor,
        yFactor,
        x = [],
        y = [];
    data.forEach((interaction) => {
        interaction.Waypoints.forEach((waypoint) => {
            x.push(waypoint[0]);
            y.push(waypoint[1]);
        });
    });
    maxX = Math.max(...x);
    maxY = Math.max(...y);

    xFactor = 1280 / maxX;
    yFactor = 720 / maxY;

    let transformedArr = [];
    data.forEach((interaction) => {
        let transformed = interaction.Waypoints.map((waypoint) => {
            return [waypoint[0]*xFactor, waypoint[1]*yFactor];
        });
        let transformedInteraction = {...interaction, Waypoints: transformed};
        transformedArr.push(transformedInteraction);
    });
    return transformedArr;
}

export const makeRectangle = (points) => {
    const sortedLR = [...points].sort((a, b) => { return a[0] - b[0] })  
    const leftPoints = sortedLR.slice(0, 2) 
    const rightPoints = sortedLR.slice(2)
    const topLeft = leftPoints.find((point) => point[1] === Math.min(leftPoints[0][1], leftPoints[1][1]))
    const bottomLeft = leftPoints.find((point) => point[1] === Math.max(leftPoints[0][1], leftPoints[1][1]))
    const topRight = rightPoints.find((point) => point[1] === Math.min(rightPoints[0][1], rightPoints[1][1]))
    const bottomRight = rightPoints.find((point) => point[1] === Math.max(rightPoints[0][1], rightPoints[1][1]))

    return {
        topLeft,
        bottomLeft,
        topRight,
        bottomRight,
    }
}

const within = ({bottomLeft, topLeft, bottomRight, topRight}, p) => {
    const polygon = [topLeft, bottomLeft, topRight, bottomRight]
    return pointInPolygon(p, polygon)
}

const inDuration = (interaction, rect) => {
    const arrLength = interaction.WaypointTimes.length
    const totalDuration = interaction.WaypointTimes.reduce((duration, currentDuration, currentIndex, WaypointTimes) => {
        if (within(rect, interaction.Waypoints[currentIndex])) {
            if (currentIndex < arrLength-1) {
                return duration + (WaypointTimes[currentIndex + 1] - currentDuration)
            } else if (currentIndex === arrLength - 1) {
                return duration + (interaction.Duration - currentDuration)
            }
        } 
        return duration
    }, 0)

    return totalDuration
}

export const getCounts = (data, rect, minDuration) => {
    const scaled = scaler(data)
    return scaled.map((interaction) => inDuration(interaction, rect)).filter((duration) => duration >= minDuration).length   
}
