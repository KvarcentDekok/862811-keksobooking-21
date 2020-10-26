"use strict";

const HIDDEN_CLASS = `hidden`;

const mapBlock = document.querySelector(`.map`);
const enTypeToRu = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};

let cardPopup;

function onCardEscPress(evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();

    closeCard();
  }
}

function onCardCloseClick(evt) {
  evt.preventDefault();

  closeCard();
}

function closeCard() {
  if (cardPopup) {
    cardPopup.remove();
    document.removeEventListener(`keydown`, onCardEscPress);
    window.pin.makeInactive();
  }
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
  const cardClose = cardElement.querySelector(`.popup__close`);
  const {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos} = offer.offer;

  makeField({
    field: cardTitle,
    data: [title],
    cb() {
      cardTitle.textContent = title;
    }
  });

  makeField({
    field: cardAddress,
    data: [address],
    cb() {
      cardAddress.textContent = address;
    }
  });

  makeField({
    field: cardPrice,
    data: [price],
    cb() {
      cardPrice.textContent = `${price}₽/ночь`;
    }
  });

  makeField({
    field: cardCapacity,
    data: [rooms, guests],
    cb() {
      cardCapacity.textContent = `${rooms} комнаты для ${guests} гостей`;
    }
  });

  makeField({
    field: cardTime,
    data: [checkin, checkout],
    cb() {
      cardTime.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
    }
  });

  makeField({
    field: cardDescription,
    data: [description],
    cb() {
      cardDescription.textContent = description;
    }
  });

  makeField({
    field: cardAvatar,
    data: [offer.author.avatar],
    cb() {
      cardAvatar.src = offer.author.avatar;
    }
  });

  makeField({
    field: cardType,
    data: [type],
    cb() {
      cardType.textContent = enTypeToRu[type];
    }
  });

  makeField({
    field: cardFeatures,
    data: [features.length],
    cb() {
      makeFeatures(features, cardFeatures);
    }
  });

  makeField({
    field: cardPhotos,
    data: [photos.length],
    cb() {
      addPhotos(photos, cardPhotos);
    }
  });

  cardPopup = cardElement;

  cardClose.addEventListener(`click`, onCardCloseClick);
  document.addEventListener(`keydown`, onCardEscPress);

  return cardElement;
}

function createPhoto(src, photoTemplate) {
  const photoElement = photoTemplate.cloneNode(true);

  photoElement.src = src;

  return photoElement;
}

function addPhotos(photos, cardPhotos) {
  const photoTemplate = cardPhotos.querySelector(`.popup__photo`);
  const photosFragment = document.createDocumentFragment();

  photoTemplate.remove();

  for (let i = 0; i < photos.length; i++) {
    photosFragment.appendChild(createPhoto(photos[i], photoTemplate));
  }

  cardPhotos.appendChild(photosFragment);
}

function addCard(offer) {
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const filtersContainer = mapBlock.querySelector(`.map__filters-container`);

  mapBlock.insertBefore(createCard(offer, cardTemplate), filtersContainer);
}

function makeField(options) {
  const isData = options.data.every((value) => {
    return value;
  });

  if (isData) {
    options.cb();
  } else {
    options.field.classList.add(HIDDEN_CLASS);
  }
}

function makeFeatures(features, cardFeatures) {
  const featuresFragment = document.createDocumentFragment();

  cardFeatures.innerHTML = ``;

  for (let i = 0; i < features.length; i++) {
    const feature = document.createElement(`li`);
    const featureClass = `popup__feature`;
    const featureClassSpecific = `${featureClass}--${features[i]}`;

    feature.textContent = features[i];
    feature.classList.add(featureClass, featureClassSpecific);

    featuresFragment.appendChild(feature);
  }

  cardFeatures.appendChild(featuresFragment);
}

function showCard(evt, offer) {
  evt.preventDefault();

  if (cardPopup) {
    cardPopup.remove();
  }

  addCard(offer);
}

window.card = {
  show: showCard,
  close: closeCard
};
