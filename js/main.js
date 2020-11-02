"use strict";

const mapBlock = document.querySelector(`.map`);
const mainPin = mapBlock.querySelector(`.map__pin--main`);
const mapErrorTemplate = document.querySelector(`#map-error`).content.querySelector(`.map-error`);

const onDataLoad = (response) => {
  const mapErrorMessage = mapBlock.querySelector(`.map-error`);

  if (mapErrorMessage) {
    mapErrorMessage.remove();
  }

  window.pin.addOnMap(response);
  window.form.toggleDisable.filters(false);
};

const onDataError = () => {
  const mapErrorMessage = mapErrorTemplate.cloneNode(true);
  const fragment = document.createDocumentFragment();

  fragment.appendChild(mapErrorMessage);
  mapBlock.appendChild(fragment);
};

const unblockDocument = () => {
  if (mapBlock.classList.contains(window.util.ClassDisabled.MAP)) {
    mapBlock.classList.remove(window.util.ClassDisabled.MAP);

    window.data.load(onDataLoad, onDataError);

    window.form.toggleDisable.adForm(false);
  }
};

const blockDocument = (evt) => {
  mapBlock.classList.add(window.util.ClassDisabled.MAP);
  window.form.toggleDisable.adForm(true);
  window.form.toggleDisable.filters(true);
  window.form.reset(evt);
};

mainPin.addEventListener(`mousedown`, (evt) => {
  if (evt.button === 0) {
    evt.preventDefault();

    unblockDocument();
  }
});

mainPin.addEventListener(`keydown`, (evt) => {
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
