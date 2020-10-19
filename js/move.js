"use strict";

const mapBlock = document.querySelector(`.map`);
const mainPin = mapBlock.querySelector(`.map__pin--main`);
const locationXMin = -(mainPin.clientWidth / 2);
const locationXMax = mapBlock.clientWidth - (mainPin.clientWidth / 2);
const locationYMin = window.data.locationY.min - mainPin.clientHeight;
const locationYMax = window.data.locationY.max - mainPin.clientHeight;

function restrictMovement(newCoords, startCoords, axis, moveEvt) {
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
}

mainPin.addEventListener(`mousedown`, function (evt) {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  function onMouseMove(moveEvt) {
    moveEvt.preventDefault();

    const shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };
    const newCoords = {
      x: mainPin.offsetLeft - shift.x,
      y: mainPin.offsetTop - shift.y
    };

    restrictMovement(newCoords, startCoords, `x`, moveEvt);
    restrictMovement(newCoords, startCoords, `y`, moveEvt);

    mainPin.style.top = newCoords.y + `px`;
    mainPin.style.left = newCoords.x + `px`;

    window.form.fillAddress();
  }

  function onMouseUp(upEvt) {
    upEvt.preventDefault();

    window.form.fillAddress();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  }

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});
