// 0. 空白
// 1. 墙
// 2. 地板

import { Empty } from "./Empty";
import { Floor } from "./Floor";
import { Wall } from "./Wall";
import { Position } from "./position";

export type Element = Empty | Floor | Wall;
export class Map {
  rawMap: number[][];
  data: Element[][];
  constructor(rawMap: number[][]) {
    this.rawMap = rawMap;
    this.data = this.initMap(this.rawMap);
  }

  initMap(rawMap: number[][]) {
    const newMap: Element[][] = [];
    rawMap.forEach((row, i) => {
      newMap[i] = [];
      row.forEach((col, j) => {
        if (col === 0) {
          newMap[i][j] = new Empty();
        } else if (col === 1) {
          newMap[i][j] = new Wall();
        } else if (col === 2) {
          newMap[i][j] = new Floor();
        }
      });
    });

    return newMap;
  }

  getElementByPositionNew(position: Position) {
    return this.data[position.y][position.x];
  }

  getElementByPosition(x: number, y: number) {
    return this.data[y][x];
  }
}

let _map: Map;
export function initMap(rawMap: number[][]) {
  _map = new Map(rawMap);
  return _map;
}

export function getMap() {
  return _map;
}
