"use strict";

(function () {
  const mapBlock = document.querySelector(`.map`);
  const mapPinsBlock = mapBlock.querySelector(`.map__pins`);
  const mainPin = mapBlock.querySelector(`.map__pin--main`);

  function unblockDocument() {
    if (mapBlock.classList.contains(`map--faded`)) {
      mapBlock.classList.remove(`map--faded`);

      window.pin.addOnMap();
      window.form.toggleDisable(false);
    }
  }

  mainPin.addEventListener(`mousedown`, function (evt) {
    if (evt.button === 0) {
      unblockDocument();
    }
  });

  mainPin.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      unblockDocument();
      window.form.fillAddress();
    }
  });

  mapPinsBlock.addEventListener(`click`, function (evt) {
    window.card.show(evt);
  });

  window.form.toggleDisable(true);
  window.form.fillAddress();
})();
