"use strict";

(function () {
  const mapBlock = document.querySelector(`.map`);
  const mapPinsBlock = mapBlock.querySelector(`.map__pins`);
  const mainPin = mapBlock.querySelector(`.map__pin--main`);

  function toggleBlockingDocument(isBlocking, evt) {
    if (mapBlock.classList.contains(`map--faded`)) {
      mapBlock.classList.remove(`map--faded`);

      window.data.load(
          function (response) {
            window.main.offers = response;

            window.pin.addOnMap(response);
          },
          function (error) {
            throw new Error(`Не удалось загрузить данные: ${error}`);
          }
      );

      window.form.toggleDisable(false);
    } else if (isBlocking) {
      mapBlock.classList.add(`map--faded`);
      window.form.toggleDisable(true);
      window.form.reset(evt);
    }
  }

  mainPin.addEventListener(`mousedown`, function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();

      toggleBlockingDocument(false);
    }
  });

  mainPin.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      evt.preventDefault();

      toggleBlockingDocument(false);
      window.form.fillAddress();
    }
  });

  mapPinsBlock.addEventListener(`click`, function (evt) {
    window.card.show(evt);
  });

  window.main = {};
  window.main.toggleBlocking = toggleBlockingDocument;

  window.form.toggleDisable(true);
  window.form.fillAddress();
})();
