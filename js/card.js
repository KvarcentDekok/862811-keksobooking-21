"use strict";

(function () {
  const mapBlock = document.querySelector(`.map`);

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

  function addCard(offer) {
    const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
    const filtersContainer = mapBlock.querySelector(`.map__filters-container`);

    mapBlock.insertBefore(createCard(offer, cardTemplate), filtersContainer);
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
})();
