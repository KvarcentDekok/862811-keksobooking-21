"use strict";

(function () {
  const mapBlock = document.querySelector(`.map`);
  const mainPin = mapBlock.querySelector(`.map__pin--main`);

  function unblockDocument() {
    if (mapBlock.classList.contains(`map--faded`)) {
      mapBlock.classList.remove(`map--faded`);

      window.data.load(
          function (response) {
            window.pin.addOnMap(response);
          },
          function (error) {
            throw new Error(`Не удалось загрузить данные: ${error}`);
          }
      );

      window.form.toggleDisable(false);
    }
  }

  function blockDocument(evt) {
    mapBlock.classList.add(`map--faded`);
    window.form.toggleDisable(true);
    window.form.reset(evt);
  }

  mainPin.addEventListener(`mousedown`, function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();

      unblockDocument();
    }
  });

  mainPin.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      evt.preventDefault();

      unblockDocument();
      window.form.fillAddress();
    }
  });

  window.form.toggleDisable(true);
  window.form.fillAddress();

  window.main = {
    blockState: blockDocument,
    unblockState: unblockDocument
  };
})();
