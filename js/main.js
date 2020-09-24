"use strict";

const mapBlock = document.querySelector(`.map`);
const offers = createOffers();

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(array) {
  return array[getRandomInt(0, array.length - 1)];
}

function getRandomUniqueElement(array) {
  const index = getRandomInt(0, array.length - 1);
  const element = array[index];

  array.splice(index, 1);
  return element;
}

function getRandomArray(array, length) {
  let result = [];

  for (let i = 0; i < length; i++) {
    result.push(array[getRandomInt(0, array.length - 1)]);
  }

  return result;
}

function createOffers() {
  const NUMBER_OF_OFFERS = 8;
  const LOCATION_Y_MIN = 130;
  const LOCATION_Y_MAX = 630;

  const result = [];
  const avatarNumbers = [`01`, `02`, `03`, `04`, `05`, `06`, `07`, `08`];
  const offerTypes = [`palace`, `flat`, `house`, `bungalow`];
  const offerTimes = [`12:00`, `13:00`, `14:00`];
  const offerPossibleFeatures = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const offerPossiblePhotos = [
    `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
  ];

  for (let i = 0; i < NUMBER_OF_OFFERS; i++) {
    const numberOfFeatures = getRandomInt(0, offerPossibleFeatures.length - 1);
    const numberOfPhotos = getRandomInt(0, offerPossiblePhotos.length - 1);
    const location = {
      x: getRandomInt(0, mapBlock.clientWidth),
      y: getRandomInt(LOCATION_Y_MIN, LOCATION_Y_MAX)
    };

    result[i] = {
      "author": {
        "avatar": `img/avatars/user${getRandomUniqueElement(avatarNumbers)}.png`
      },
      "offer": {
        "title": `Загололвок предложения`,
        "address": `${location.x}, ${location.y}`,
        "price": 20000,
        "type": getRandomElement(offerTypes),
        "rooms": 3,
        "guests": 20,
        "checkin": getRandomElement(offerTimes),
        "checkout": getRandomElement(offerTimes),
        "features": getRandomArray(offerPossibleFeatures, numberOfFeatures),
        "description": `Описание`,
        "photos": getRandomArray(offerPossiblePhotos, numberOfPhotos)
      },
      "location": {
        "x": location.x,
        "y": location.y
      }
    };
  }

  return result;
}

function createPin(offer, pinTemplate) {
  const OFFSET_X = 25;
  const OFFSET_Y = 70;

  const pinElement = pinTemplate.cloneNode(true);
  const pinAvatar = pinElement.querySelector(`img`);

  pinElement.style.left = `${offer.location.x - OFFSET_X}px`;
  pinElement.style.top = `${offer.location.y - OFFSET_Y}px`;
  pinAvatar.src = offer.author.avatar;
  pinAvatar.alt = offer.offer.title;

  return pinElement;
}

function addPins() {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const pinsFragment = document.createDocumentFragment();
  const mapPinsBlock = mapBlock.querySelector(`.map__pins`);

  for (let i = 0; i < offers.length; i++) {
    pinsFragment.appendChild(createPin(offers[i], pinTemplate));
  }

  mapPinsBlock.appendChild(pinsFragment);
}

addPins();
mapBlock.classList.remove(`map--faded`);
