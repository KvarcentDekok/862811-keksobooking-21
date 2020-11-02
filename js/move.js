"use strict";

const mapBlock = document.querySelector(`.map`);
const mainPin = mapBlock.querySelector(`.map__pin--main`);
const locationXMin = -(mainPin.clientWidth / 2);
const locationXMax = mapBlock.clientWidth - (mainPin.clientWidth / 2);
const locationYMin = window.util.locationY.min - mainPin.clientHeight;
const locationYMax = window.util.locationY.max - mainPin.clientHeight;

let onMouseMove;

const movePin = (startCoords, evt) => {
  evt.preventDefault();

  const shift = {
    x: startCoords.x - evt.clientX,
    y: startCoords.y - evt.clientY
  };
  const newCoords = {
    x: mainPin.offsetLeft - shift.x,
    y: mainPin.offsetTop - shift.y
  };

  restrictMovement(newCoords, startCoords, `x`, evt);
  restrictMovement(newCoords, startCoords, `y`, evt);

  mainPin.style.top = newCoords.y + `px`;
  mainPin.style.left = newCoords.x + `px`;

  window.form.fillAddress();
};

const onMouseUp = (evt) => {
  evt.preventDefault();

  window.form.fillAddress();

  document.removeEventListener(`mousemove`, onMouseMove);
  document.removeEventListener(`mouseup`, onMouseUp);
};

const restrictMovement = (newCoords, startCoords, axis, moveEvt) => {
  let min;
  let max;
  let evtCoords;

  if (axis === `x`) {
    min = locationXMin;
    max = locationXMax;
    evtCoords = moveEvt.clientX;
  } else if (axis === `y`) {
    min = locationYMin;
    max = locationYMax;
    evtCoords = moveEvt.clientY;
  }

  if (newCoords[axis] < max && newCoords[axis] > min) {
    startCoords[axis] = evtCoords;
  }

  if (newCoords[axis] < min) {
    newCoords[axis] = min;
  }

  if (newCoords[axis] > max) {
    newCoords[axis] = max;
  }
};

const initMovePin = (evt) => {
  if (evt.button === 0) {
    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    evt.preventDefault();

    onMouseMove = movePin.bind(undefined, startCoords);

    document.addEventListener(`mousemove`, onMouseMove);

    document.addEventListener(`mouseup`, onMouseUp);
  }
};

mainPin.addEventListener(`mousedown`, (evt) => {
  initMovePin(evt);
});
