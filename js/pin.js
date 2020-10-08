"use strict";

(function () {
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;

  const mapBlock = document.querySelector(`.map`);
  const mapPinsBlock = mapBlock.querySelector(`.map__pins`);

  function createPin(offer, pinTemplate) {
    const pinElement = pinTemplate.cloneNode(true);
    const pinAvatar = pinElement.querySelector(`img`);

    pinElement.style.left = `${offer.location.x - PIN_WIDTH / 2}px`;
    pinElement.style.top = `${offer.location.y - PIN_HEIGHT}px`;
    pinElement.dataset.offer = String(window.main.offers.indexOf(offer));
    pinAvatar.src = offer.author.avatar;
    pinAvatar.alt = offer.offer.title;

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

  window.pin = {
    addOnMap: addPins
  };
})();
