"use strict";

const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const ACTIVE_PIN_CLASS = `map__pin--active`;

const mapBlock = document.querySelector(`.map`);
const mapPinsBlock = mapBlock.querySelector(`.map__pins`);

const makePinActive = (pin) => {
  makePinInactive();

  pin.classList.add(ACTIVE_PIN_CLASS);
};

const makePinInactive = () => {
  const currentActivePin = mapPinsBlock.querySelector(`.${ACTIVE_PIN_CLASS}`);

  if (currentActivePin) {
    currentActivePin.classList.remove(ACTIVE_PIN_CLASS);
  }
};

const createPin = (offer, pinTemplate) => {
  const pinElement = pinTemplate.cloneNode(true);
  const pinAvatar = pinElement.querySelector(`img`);

  pinElement.style.left = `${offer.location.x - PIN_WIDTH / 2}px`;
  pinElement.style.top = `${offer.location.y - PIN_HEIGHT}px`;
  pinAvatar.src = offer.author.avatar;
  pinAvatar.alt = offer.offer.title;

  pinElement.addEventListener(`click`, (evt) => {
    makePinActive(pinElement);
    window.card.show(evt, offer);
  });

  return pinElement;
};

const addPins = (offers, pinsCount) => {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const pinsFragment = document.createDocumentFragment();

  offers = offers.filter((offer) => {
    return offer.offer;
  });

  pinsCount = pinsCount < offers.length ? pinsCount : offers.length;

  for (let i = 0; i < pinsCount; i++) {
    pinsFragment.appendChild(createPin(offers[i], pinTemplate));
  }

  mapPinsBlock.appendChild(pinsFragment);
};

const removePins = () => {
  const pins = mapPinsBlock.querySelectorAll(`.map__pin:not(.map__pin--main)`);

  pins.forEach((el) => {
    el.remove();
  });
};

window.pin = {
  addOnMap: window.debounce(window.filter(addPins)),
  removeFromMap: removePins,
  makeInactive: makePinInactive
};
