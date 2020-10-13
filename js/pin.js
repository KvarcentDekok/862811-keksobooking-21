"use strict";

(function () {
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;

  const mapBlock = document.querySelector(`.map`);
  const mapPinsBlock = mapBlock.querySelector(`.map__pins`);

  function onPinClick(offer, evt) {
    evt.preventDefault();

    window.card.show(offer);
  }

  function createPin(offer, pinTemplate) {
    const pinElement = pinTemplate.cloneNode(true);
    const pinAvatar = pinElement.querySelector(`img`);

    pinElement.style.left = `${offer.location.x - PIN_WIDTH / 2}px`;
    pinElement.style.top = `${offer.location.y - PIN_HEIGHT}px`;
    pinAvatar.src = offer.author.avatar;
    pinAvatar.alt = offer.offer.title;

    pinElement.addEventListener(`click`, onPinClick.bind(undefined, offer));

    return pinElement;
  }

  function addPins(offers) {
    const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
    const pinsFragment = document.createDocumentFragment();

    for (let i = 0; i < offers.length; i++) {
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
    addOnMap: addPins,
    removeFromMap: removePins
  };
})();
