"use strict";

(function () {
  const mapBlock = document.querySelector(`.map`);
  const mainPin = mapBlock.querySelector(`.map__pin--main`);
  const locationXMin = -(mainPin.clientWidth / 2);
  const locationXMax = mapBlock.clientWidth - (mainPin.clientWidth / 2);
  const locationYMin = window.data.locationY.min - mainPin.clientHeight;
  const locationYMax = window.data.locationY.max - mainPin.clientHeight;

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

      startCoords.x = moveEvt.clientX;

      if (newCoords.x < locationXMin) {
        newCoords.x = locationXMin;
      }

      if (newCoords.x > locationXMax) {
        newCoords.x = locationXMax;
      }

      if (newCoords.y < locationYMax && newCoords.y > locationYMin) {
        startCoords.y = moveEvt.clientY;
      }

      if (newCoords.y < locationYMin) {
        newCoords.y = locationYMin;
      }

      if (newCoords.y > locationYMax) {
        newCoords.y = locationYMax;
      }

      mainPin.style.top = newCoords.y + `px`;
      mainPin.style.left = newCoords.x + `px`;

      window.form.fillAddress();
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      window.form.fillAddress();

      mapBlock.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    }

    mapBlock.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
})();
