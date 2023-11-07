enum Cell {
    SPACE = 0,
    WALL = 2,
    BOX = 3,
    VISITED = 4,
}
type Map = Array<Cell>;
export type Position = [number, number];
type Targets = {
    [key: string]:boolean
}
export type Step = {
    current: Position,
    last: Step | null
}

export class SokobanPatttern {
    map: Map
    width: number
    player: Position
    targets: Targets
    unsolved: number
    lastStep: SokobanPatttern | null;
    constructor(map: Map, width: number = 8, targets: Targets = {13: false}, player: Position = [2, 2], lastStep?: SokobanPatttern, unsolved?: number){
        this.map = map || [
            2, 2, 2, 2, 2, 2, 2, 2,
            2, 0, 0, 3, 0, 0, 0, 2,
            2, 0, 0, 0, 0, 0, 0, 2,
            2, 0, 0, 2, 0, 0, 0, 2,
            2, 0, 0, 2, 0, 0, 0, 2,
            2, 0, 0, 2, 0, 0, 0, 2,
            2, 0, 0, 2, 0, 0, 0, 2,
            2, 2, 2, 2, 2, 2, 2, 2,
        ];
        this.targets = targets;
        this.width = width;
        this.player = player;
        if(unsolved === void 0) {
            let count = 0;
            for(let key in targets) {
                if(!this.targets[key])
                    count++;
            }
            this.unsolved = count;
        } else {
            this.unsolved = unsolved;
        }
        this.lastStep = lastStep || null;
    }
    findNextSteps(lastSteps:Step|null = null) {
        let result: Array<{steps:Step, pattern:SokobanPatttern}> = [];

        let map: Array<Cell> = Object.create(this.map);


        let collection: Array<Step> = [{
            current: this.player,
            last: lastSteps
        }];

        while(collection.length) {
            let step = collection.shift()!
            let {current} = step;
            let [x, y] = current;

            let pos = y * this.width + x;

            if(map[pos] === Cell.SPACE) {

                map[pos] = Cell.VISITED;

                const check = (dx: number, dy: number) => {
                    let boxPos = (y + dy)  * this.width + x + dx;
                    let newBoxPos = (y + dy * 2) * this.width + x + dx * 2;
                    if(map[boxPos] === Cell.BOX) {
                        if(map[newBoxPos] === Cell.SPACE || map[newBoxPos] === Cell.VISITED) {
                            let newMap = Object.create(this.map);
                            newMap[pos] = Cell.SPACE;
                            newMap[boxPos] = Cell.SPACE;
                            newMap[newBoxPos] = Cell.BOX;
    
                            let newTargets = Object.create(this.targets);
    
                            if(this.targets[boxPos])
                                newTargets[boxPos] = false;
    
                            if(newBoxPos.toString() in this.targets)
                                newTargets[newBoxPos] = true;

                            let newX = boxPos % this.width;
                            let newY= (boxPos - newX) / this.width;
                            result.push({
                                steps: {current: [x + dx, y + dy], last:step},
                                pattern:new SokobanPatttern(newMap, this.width, newTargets, [newX, newY], this)
                            });
                        }
                    }
                }
                check(1, 0);
                check(-1, 0);
                check(0, 1);
                check(0, -1);

                collection.push({
                    current: [x - 1, y],
                    last: step
                });
                collection.push({
                    current: [x + 1, y],
                    last: step
                });
                collection.push({
                    current: [x, y - 1],
                    last: step
                });
                collection.push({
                    current: [x, y + 1],
                    last: step
                });
            }
            
        }
        //console.log(result);
        return result;
    }

    solve(lastSteps:Step|null = null) {
        let collection: Array<{steps:Step|null, pattern:SokobanPatttern}> = [{steps:lastSteps, pattern:this}];
        let dict: Set<string> = new Set();
        while(collection.length) {
            //console.log(collection.map(({pattern}) => pattern.toString()));
            let {pattern, steps} = collection.shift()!;
            let nextSteps: Array<{steps:Step|null, pattern:SokobanPatttern}> = pattern.findNextSteps(steps);
            //console.log("<nextSteps>",nextSteps.map(({pattern}) => pattern.toString()),"</nextSteps>");
            if(pattern.unsolved === 0) {
                //console.log(pattern);
                return {pattern, steps};
            }

            for(let step of nextSteps) {
                let hashCode = step.pattern.toString()
                if(dict.has(hashCode))
                    continue;
                dict.add(hashCode);
                collection.push(step);
            }
            
        }
        return false;
    }


    toString(){
        let str = "";
        for(let i = 0; i < this.map.length; i++) {
            str += this.map[i];
            if(i % this.width === this.width - 1)
                str += "\n"
        }
        str += `player:${this.player}\n`
        return str;
    }

}