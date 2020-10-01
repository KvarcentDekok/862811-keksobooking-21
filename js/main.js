"use strict";

const NUMBER_OF_OFFERS = 8;
const LOCATION_Y_MIN = 130;
const LOCATION_Y_MAX = 630;
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;

const offerTypes = [`palace`, `flat`, `house`, `bungalow`];
const offerTimes = [`12:00`, `13:00`, `14:00`];
const offerPossibleFeatures = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const offerPossiblePhotos = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];
const mapBlock = document.querySelector(`.map`);
const offers = createOffers();

console.log(offers[0]);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(array) {
  return array[getRandomInt(0, array.length - 1)];
}

function getRandomArray(array, length) {
  let result = [];

  for (let i = 0; i < length; i++) {
    const index = getRandomInt(0, array.length - 1);

    if (!(result.indexOf(array[index]) + 1)) {
      result.push(array[index]);
    }
  }

  return result;
}

function createOffers() {
  const result = [];

  for (let i = 0; i < NUMBER_OF_OFFERS; i++) {
    const numberOfFeatures = getRandomInt(0, offerPossibleFeatures.length - 1);
    const numberOfPhotos = getRandomInt(0, offerPossiblePhotos.length - 1);
    const location = {
      x: getRandomInt(0, mapBlock.clientWidth),
      y: getRandomInt(LOCATION_Y_MIN, LOCATION_Y_MAX)
    };

    result[i] = {
      "author": {
        "avatar": `img/avatars/user0${i + 1}.png`
      },
      "offer": {
        "title": `Жильё мечты`,
        "address": `${location.x}, ${location.y}`,
        "price": getRandomInt(10000, 100000),
        "type": getRandomElement(offerTypes),
        "rooms": getRandomInt(1, 4),
        "guests": getRandomInt(1, 20),
        "checkin": getRandomElement(offerTimes),
        "checkout": getRandomElement(offerTimes),
        "features": getRandomArray(offerPossibleFeatures, numberOfFeatures),
        "description": `Центральное отопление, счетчики на все установлены. Не требует ремонта.
         Застекленная лоджия, 6 метров, сделана под ключ, подходит для расширения комнаты.`,
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
  const pinElement = pinTemplate.cloneNode(true);
  const pinAvatar = pinElement.querySelector(`img`);

  pinElement.style.left = `${offer.location.x - PIN_WIDTH / 2}px`;
  pinElement.style.top = `${offer.location.y - PIN_HEIGHT}px`;
  pinAvatar.src = offer.author.avatar;
  pinAvatar.alt = offer.offer.title;

  return pinElement;
}

function createCard(offer, cardTemplate) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(`.popup__title`);
  const cardAddress = cardElement.querySelector(`.popup__text--address`);
  const cardPrice = cardElement.querySelector(`.popup__text--price`);
  const cardType = cardElement.querySelector(`.popup__type`);
  const cardCapacity = cardElement.querySelector(`.popup__text--capacity`);
  const cardTime = cardElement.querySelector(`.popup__text--time`);
  const cardFeatures = cardElement.querySelector(`.popup__features`);
  const cardDescription = cardElement.querySelector(`.popup__description`);
  const cardPhotos = cardElement.querySelector(`.popup__photos`);
  const cardAvatar = cardElement.querySelector(`.popup__avatar`);
  const {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos} = offer.offer;

  cardTitle.textContent = title;
  cardAddress.textContent = address;
  cardPrice.textContent = `${price}₽/ночь`;
  cardCapacity.textContent = `${rooms} комнаты для ${guests} гостей`;
  cardTime.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  cardDescription.textContent = description;
  cardAvatar.src = offer.author.avatar;

  makeType(type, cardType);
  makeFeatures(features, cardFeatures);
  addPhotos(photos, cardPhotos);

  return cardElement;
}

function createPhoto(src, photoTemplate) {
  const photoElement = photoTemplate.cloneNode(true);

  photoElement.src = src;

  return photoElement;
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

function addPhotos(photos, cardPhotos) {
  if (photos.length) {
    const photoTemplate = cardPhotos.querySelector(`.popup__photo`);
    const photosFragment = document.createDocumentFragment();

    photoTemplate.remove();

    for (let i = 0; i < photos.length; i++) {
      photosFragment.appendChild(createPhoto(photos[i], photoTemplate));
    }

    cardPhotos.appendChild(photosFragment);
  } else {
    cardPhotos.classList.add(`hidden`);
  }
}

function addCard() {
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const filtersContainer = mapBlock.querySelector(`.map__filters-container`);

  mapBlock.insertBefore(createCard(offers[0], cardTemplate), filtersContainer);
}

function makeFeatures(features, cardFeatures) {
  if (features.length) {
    const featuresFragment = document.createDocumentFragment();

    cardFeatures.innerHTML = ``;

    for (let i = 0; i < features.length; i++) {
      const feature = document.createElement(`li`);

      feature.textContent = features[i];
      feature.classList.add(`popup__feature`, `popup__feature--${features[i]}`);

      featuresFragment.appendChild(feature);
    }

    cardFeatures.appendChild(featuresFragment);
  } else {
    cardFeatures.classList.add(`hidden`);
  }
}

function makeType(type, cardType) {
  switch (type) {
    case `palace`:
      cardType.textContent = `Дворец`;
      break;
    case `flat`:
      cardType.textContent = `Квартира`;
      break;
    case `house`:
      cardType.textContent = `Дом`;
      break;
    case `bungalow`:
      cardType.textContent = `Бунгало`;
  }
}

mapBlock.classList.remove(`map--faded`);

addPins();
addCard();
