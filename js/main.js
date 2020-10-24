"use strict";

const mapBlock = document.querySelector(`.map`);
const mainPin = mapBlock.querySelector(`.map__pin--main`);
const mapErrorTemplate = document.querySelector(`#map-error`).content.querySelector(`.map-error`);

function unblockDocument() {
  if (mapBlock.classList.contains(`map--faded`)) {
    mapBlock.classList.remove(`map--faded`);

    window.data.load(
        function (response) {
          const mapErrorMessage = mapBlock.querySelector(`.map-error`);

          if (mapErrorMessage) {
            mapErrorMessage.remove();
          }

          window.pin.addOnMap(response);
          window.form.toggleDisable.filters(false);
        },
        function () {
          const mapErrorMessage = mapErrorTemplate.cloneNode(true);
          const fragment = document.createDocumentFragment();

          fragment.appendChild(mapErrorMessage);
          mapBlock.appendChild(fragment);
        }
    );

    window.form.toggleDisable.adForm(false);
  }
}

function blockDocument(evt) {
  mapBlock.classList.add(`map--faded`);
  window.form.toggleDisable.adForm(true);
  window.form.toggleDisable.filters(true);
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

window.form.toggleDisable.adForm(true);
window.form.toggleDisable.filters(true);
window.form.fillAddress();

window.main = {
  blockState: blockDocument,
  unblockState: unblockDocument
};
