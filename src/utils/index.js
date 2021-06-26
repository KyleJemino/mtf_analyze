let a1 = [[450, 100], [520, 85], [640, 190], [700, 170]];
let a2 = [[328, 136], [450, 100], [520, 260], [640, 190]];
let c1 = [[95, 150], [328, 136], [264, 282], [455, 255]];
let c2 = [[0, 180], [95, 150], [153, 377], [264, 282]];
let b1 = [[640, 190],[766, 171], [910, 354], [1010, 298]];
let b2 = [[570, 270], [640, 190], [820, 433], [910, 354]];
let d1 = [[344, 289], [508,289], [630, 507], [750, 450]];
let d2 = [[197, 368], [344, 289], [462, 567], [630, 507]];

const line  = ([x1, y1], [x2, y2]) => {
    const m = (y2 - y1) / (x2 -x1);
    const b = y1 - (m*x1);
    return (x) => {
        let y = (m*x) +b;
        return y;
    };
}

const scaler = (data) => {
//  data.filter((datum) => datum.Duration > 60 );
    var minX,
        minY,
        maxX,
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
    minX = Math.min(...x);
    minY = Math.min(...y);
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

//Thesis note: cartesian coordinate of pic is upside down so pixels above a line are actually less than y of line
const within = ({bottomLeft: p1, topLeft: p2, bottomRight: p3, topRight: p4}, p) => {
    const left = line(p1, p2)(p[0]);
    const bot = line(p1, p3)(p[0]);
    const right = line(p3, p4)(p[0]);
    const top = line(p4, p2)(p[0]);
    return p[1] >= left && p[1] <= right && p[1] <= bot && p[1] >= top;
}

const inDuration = (interaction, rect) => {
    let i = 0, durationArr=[];
    while (i < interaction.Waypoints.length) {
        if(within(rect, interaction.Waypoints[i]) && i < interaction.Waypoints.length - 1){
            let period = [interaction.WaypointTimes[i]];
            while(within(rect, interaction.Waypoints[i+1]) && i+1 < interaction.Waypoints.length - 1){
                i++;
            }
            period.push(interaction.WaypointTimes[i+1]);
            durationArr.push(period);
        }
        i++;
    }
    let totalDuration = durationArr.reduce((total, current) => {
        let periodValue = current[1]-current[0];
        return total + periodValue;
    }, 0);
    return totalDuration;
}

const counter = (data, timeStayed) => {
    let scaled = scaler(data);
    return {
        sa1 : scaled.map((interaction) => inDuration(interaction, a1)).filter((duration) => duration >= timeStayed).length,
        sa2 : scaled.map((interaction) => inDuration(interaction, a2)).filter((duration) => duration >= timeStayed).length,
        sb1 : scaled.map((interaction) => inDuration(interaction, b1)).filter((duration) => duration >= timeStayed).length,
        sb2 : scaled.map((interaction) => inDuration(interaction, b2)).filter((duration) => duration >= timeStayed).length,
        sc1 : scaled.map((interaction) => inDuration(interaction, c1)).filter((duration) => duration >= timeStayed).length,
        sc2 : scaled.map((interaction) => inDuration(interaction, c2)).filter((duration) => duration >= timeStayed).length,
        sd1 : scaled.map((interaction) => inDuration(interaction, d1)).filter((duration) => duration >= timeStayed).length,
        sd2 : scaled.map((interaction) => inDuration(interaction, d2)).filter((duration) => duration >= timeStayed).length,
    }
}
// console.dir(data);
// console.dir(counter(data21, 30));
