import { createRouter, createWebHashHistory } from "vue-router";
import Game from "../view/Game.vue";
import GameAuto from "../view/GameAuto.vue";
import MapEdit from "../view/MapEdit.vue";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "Game",
    },

    {
      name: "Game",
      path: "/game",
      component: Game,
    },
    {
      name: "GameAuto",
      path: "/game-auto",
      component: GameAuto,
    },
    {
      path: "/mapEdit",
      component: MapEdit,
    },
  ],
});
