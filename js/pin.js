"use strict";

(function () {
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
  const CLEAR_FILTER_VALUE = `any`;

  const mapBlock = document.querySelector(`.map`);
  const mapPinsBlock = mapBlock.querySelector(`.map__pins`);

  function createPin(offer, pinTemplate) {
    const pinElement = pinTemplate.cloneNode(true);
    const pinAvatar = pinElement.querySelector(`img`);

    pinElement.style.left = `${offer.location.x - PIN_WIDTH / 2}px`;
    pinElement.style.top = `${offer.location.y - PIN_HEIGHT}px`;
    pinAvatar.src = offer.author.avatar;
    pinAvatar.alt = offer.offer.title;

    pinElement.addEventListener(`click`, function (evt) {
      window.card.show(evt, offer);
    });

    return pinElement;
  }

  function addPins(offers, filters) {
    const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
    const pinsFragment = document.createDocumentFragment();

    if (filters.type !== CLEAR_FILTER_VALUE) {
      offers = offers.filter(function (value) {
        return value.offer.type === filters.type;
      });
    }

    const pinsCount = filters.pinsCount < offers.length ? filters.pinsCount : offers.length;

    for (let i = 0; i < pinsCount; i++) {
      pinsFragment.appendChild(createPin(offers[i], pinTemplate));
    }

    mapPinsBlock.appendChild(pinsFragment);
  }

  function removePins() {
    const pins = mapPinsBlock.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    for (let i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
  }

  window.pin = {
    addOnMap: window.filter(addPins),
    removeFromMap: removePins
  };
})();
