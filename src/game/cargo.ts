import { Position } from "./position";

export interface Cargo {
  x: number;
  y: number;
}

let _cargos: Cargo[] = [];
export function initCargos(cargos: Cargo[]) {
  _cargos = cargos;
}

export function getCargos() {
  return _cargos;
}

export function getCargoByPosition(position: Position) {
  return _cargos.find((c) => {
    return c.x === position.x && c.y === position.y
  });
}