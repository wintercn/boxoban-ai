<template>
  <div class="relative">
    <MapComp></MapComp>
    <PlacePoints></PlacePoints>
    <PlayerComp></PlayerComp>
    <Cargos></Cargos>
    <div v-show="game.isWin">
      <button class="bg-red-500" @click="handleNextCheckpoint">下一关</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import MapComp from "../components/Map.vue";
import PlayerComp from "../components/Player.vue";
import Cargos from "../components/Cargos.vue";
import PlacePoints from "../components/PlacePoints.vue";

import { getPlacePoints, getCargos, getPlayer, getMap, setupGame, createGame, startGame, startNextLevel, moveRight, moveLeft, moveUp, moveDown} from "../game";
import { reactive, onMounted, watchEffect } from "vue";
import { SokobanPatttern, Step } from "../ai/sokoban-ai";

function stepsToString(step:Step|null):string{
    let r = "";
    while(step) {
        r += step.current.toString() + "\n";
        step = step.last;
    }
    return r;
}

function stepsToDirection(step:Step|null){
    let r = [];
    let last: Step|null = null;

    while(step) {
        //r += step.current.toString() + "\n";
        if(last) {
          if(last.current[0] === step.current[0] - 1) {
            r.push(moveLeft)
          } else if(last.current[0] === step.current[0] + 1) {
            r.push(moveRight)
          }else if(last.current[1] === step.current[1] - 1) {
            r.push(moveUp)
          }else if(last.current[1] === step.current[1] + 1) {
            r.push(moveDown)
          }
        }
        last = step;
        step = step.last;
    }
    return r.reverse();
}

const game = reactive(createGame({ level: 1 }));
setupGame(game);


function sleep(t:number){
  return new Promise(resolve => setTimeout(resolve, t));
}

const solve =  async ()=>{
  let map = getMap();
  let player = getPlayer();
  console.log("player", player);
  let aiMap = []

  let boxes = getCargos();
  console.log("boxes", boxes);

  let points = getPlacePoints();
  console.log("points", points);

  let width = map.data[0].length;
  //
  for(let row of map.data) {
    for(let cell of row)
      aiMap.push( cell.name === "Wall" ? 2 : 0);
  }
  for(let box of boxes) {
    aiMap[box.x + box.y * width] = 3;
  }
  let targets:Record<number, boolean> = {};

  for(let point of points) {
    targets[point.x + point.y * width] = aiMap[point.x + point.y * width] === 3 ? true : false;
  }

  let pattern = new SokobanPatttern(aiMap, width, targets, [player.x, player.y]);

  let r = pattern.solve();
  //console.log()
  if(r) {
    console.log(stepsToString(r.steps));
    console.log(r.pattern.toString());
    for(let op of stepsToDirection(r.steps)) {
      op();
      await sleep(500);
    }
    //console.log(.map(f => f.name));
  }

  //console.log(r);
  //console.log();
  //moveDown();
}


setTimeout(solve,1000);

//watchEffect(solve);


onMounted(() => {
  startGame();
});

function handleNextCheckpoint() {
  startNextLevel();
  setTimeout(solve,1000);
}
</script>
