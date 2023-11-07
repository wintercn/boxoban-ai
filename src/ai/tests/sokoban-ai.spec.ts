import { it, expect, describe } from "vitest";
import { SokobanPatttern, Step} from "../sokoban-ai.ts";

function stepsToString(step:Step|null):string{
    let r = "";
    while(step) {
        r += step.current.toString() + "\n";
        step = step.last;
    }
    return r;
}
function patternStepsToString(pattern:Step|null):string{
    let r = "";
    while(step) {
        r += step.current.toString() + "\n";
        step = step.last;
    }
    return r;
}

describe("sokoban ai", () => {
    it("box at edge", () => {
        let pattern = new SokobanPatttern([
            2, 2, 2, 2, 2, 2, 2, 2,
            2, 0, 0, 3, 0, 0, 0, 2,
            2, 0, 0, 0, 0, 0, 0, 2,
            2, 0, 0, 2, 0, 0, 0, 2,
            2, 0, 0, 2, 0, 0, 0, 2,
            2, 0, 0, 2, 0, 0, 0, 2,
            2, 0, 0, 2, 0, 0, 0, 2,
            2, 2, 2, 2, 2, 2, 2, 2,
        ]);

        let r = pattern.findNextSteps().map(({pattern}) => pattern.toString());
        expect(r.join("\n")).toMatchInlineSnapshot(`
          "22222222
          20003002
          20000002
          20020002
          20020002
          20020002
          20020002
          22222222
          player:3,1

          22222222
          20300002
          20000002
          20020002
          20020002
          20020002
          20020002
          22222222
          player:3,1
          "
        `);
        //console.log(JSON.stringify(r));
    });
    it("box at edge 2", () => {
        let pattern = new SokobanPatttern([
            2, 2, 2, 2, 2, 2, 2, 2,
            2, 0, 0, 3, 0, 0, 0, 2,
            2, 0, 0, 0, 0, 0, 0, 2,
            2, 0, 0, 2, 0, 0, 0, 2,
            2, 0, 0, 2, 0, 0, 0, 2,
            2, 0, 0, 2, 0, 0, 0, 2,
            2, 0, 0, 2, 0, 0, 0, 2,
            2, 2, 2, 2, 2, 2, 2, 2,
        ]);

        let r = pattern.findNextSteps().map(({pattern})=> pattern.toString());
        //console.log(r.join("\n"));
        expect(r.join("\n")).toMatchInlineSnapshot(`
          "22222222
          20003002
          20000002
          20020002
          20020002
          20020002
          20020002
          22222222
          player:3,1

          22222222
          20300002
          20000002
          20020002
          20020002
          20020002
          20020002
          22222222
          player:3,1
          "
        `);

        //expect(`[{"10":0,"11":0,"12":3},{"10":3,"11":0,"12":0}]` === JSON.stringify(r)).toBeTruthy()
    });
    it("box at center", () => {
        let pattern = new SokobanPatttern([
            2, 2, 2, 2, 2, 2, 2, 2,
            2, 0, 0, 0, 0, 0, 0, 2,
            2, 0, 0, 3, 0, 0, 0, 2,
            2, 0, 0, 0, 0, 0, 0, 2,
            2, 0, 0, 2, 0, 0, 0, 2,
            2, 0, 0, 2, 0, 0, 0, 2,
            2, 0, 0, 2, 0, 0, 0, 2,
            2, 2, 2, 2, 2, 2, 2, 2,
        ]);

        let r = pattern.findNextSteps().map(({pattern}) => pattern.toString());
        //console.log(r.join("\n"));
        expect(r.join("\n")).toMatchInlineSnapshot(`
          "22222222
          20000002
          20003002
          20000002
          20020002
          20020002
          20020002
          22222222
          player:3,2

          22222222
          20000002
          20000002
          20030002
          20020002
          20020002
          20020002
          22222222
          player:3,2

          22222222
          20030002
          20000002
          20000002
          20020002
          20020002
          20020002
          22222222
          player:3,2

          22222222
          20000002
          20300002
          20000002
          20020002
          20020002
          20020002
          22222222
          player:3,2
          "
        `);
        //expect(`` === r.join("\n")).toBeTruthy()
        //expect(`[{"10":0,"11":0,"12":3},{"10":3,"11":0,"12":0}]` === JSON.stringify(r)).toBeTruthy()
    });
    it("two box", () => {
        let pattern = new SokobanPatttern([
            2, 2, 2, 2, 2, 2, 2, 2,
            2, 0, 0, 0, 0, 0, 0, 2,
            2, 0, 0, 3, 0, 3, 0, 2,
            2, 0, 0, 0, 0, 0, 0, 2,
            2, 0, 0, 2, 0, 0, 0, 2,
            2, 0, 0, 2, 0, 0, 0, 2,
            2, 0, 0, 2, 0, 0, 0, 2,
            2, 2, 2, 2, 2, 2, 2, 2,
        ]);

        let r = pattern.findNextSteps().map(({pattern}) => pattern.toString());
        //console.log(r.join("\n"));
        expect(r.join("\n")).toMatchInlineSnapshot(`
          "22222222
          20000002
          20003302
          20000002
          20020002
          20020002
          20020002
          22222222
          player:3,2

          22222222
          20000002
          20000302
          20030002
          20020002
          20020002
          20020002
          22222222
          player:3,2

          22222222
          20030002
          20000302
          20000002
          20020002
          20020002
          20020002
          22222222
          player:3,2

          22222222
          20000002
          20030002
          20000302
          20020002
          20020002
          20020002
          22222222
          player:5,2

          22222222
          20000002
          20030032
          20000002
          20020002
          20020002
          20020002
          22222222
          player:5,2

          22222222
          20000002
          20300302
          20000002
          20020002
          20020002
          20020002
          22222222
          player:3,2

          22222222
          20000302
          20030002
          20000002
          20020002
          20020002
          20020002
          22222222
          player:5,2

          22222222
          20000002
          20033002
          20000002
          20020002
          20020002
          20020002
          22222222
          player:5,2
          "
        `);
        //expect(`` === r.join("\n")).toBeTruthy()
        //expect(`[{"10":0,"11":0,"12":3},{"10":3,"11":0,"12":0}]` === JSON.stringify(r)).toBeTruthy()
    });
    it("resolve box at edge", () => {
        let pattern = new SokobanPatttern([
            2, 2, 2, 2, 2, 2, 2, 2,
            2, 0, 0, 3, 0, 0, 0, 2,
            2, 0, 0, 0, 0, 0, 0, 2,
            2, 0, 0, 2, 0, 0, 0, 2,
            2, 0, 0, 2, 0, 0, 0, 2,
            2, 0, 0, 2, 0, 0, 0, 2,
            2, 0, 0, 2, 0, 0, 0, 2,
            2, 2, 2, 2, 2, 2, 2, 2,
        ], 8, {13: false}, [2, 2]);

        let r = pattern.solve();
        //console.log(r);
        expect(r).not.toBeFalsy();
        if(r)
            expect(stepsToString(r.steps)).toMatchInlineSnapshot(`
              "3,1
              2,1
              2,2
              "
            `);

        //expect(r.join("\n")).toMatchInlineSnapshot();
        //console.log(JSON.stringify(r));
    });
    it("resolve box at edge", () => {
        let pattern = new SokobanPatttern([
            2, 2, 2, 2, 2, 2, 2, 2,
            2, 0, 0, 3, 0, 0, 0, 2,
            2, 0, 0, 0, 0, 0, 0, 2,
            2, 0, 0, 2, 0, 0, 0, 2,
            2, 0, 0, 2, 0, 0, 0, 2,
            2, 0, 0, 2, 0, 0, 0, 2,
            2, 0, 0, 2, 0, 0, 0, 2,
            2, 2, 2, 2, 2, 2, 2, 2,
        ], 8, {13: false}, [1, 6]);

        let r = pattern.solve();
        //console.log(r);
        expect(r).not.toBeFalsy();
        if(r)
            expect(stepsToString(r.steps)).toMatchInlineSnapshot(`
              "3,1
              2,1
              2,2
              2,3
              2,4
              2,5
              2,6
              1,6
              "
            `);

        //expect(r.join("\n")).toMatchInlineSnapshot();
        //console.log(JSON.stringify(r));
    });
});