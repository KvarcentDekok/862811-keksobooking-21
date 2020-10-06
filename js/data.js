"use strict";

(function () {
  const NUMBER_OF_OFFERS = 8;
  const LOCATION_Y_MIN = 130;
  const LOCATION_Y_MAX = 630;

  const offerTypes = [`palace`, `flat`, `house`, `bungalow`];
  const offerTimes = [`12:00`, `13:00`, `14:00`];
  const offerPossibleFeatures = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const offerPossiblePhotos = [
    `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
  ];
  const mapBlock = document.querySelector(`.map`);
  const offersData = createOffers();

  function createOffers() {
    const result = [];

    for (let i = 0; i < NUMBER_OF_OFFERS; i++) {
      const numberOfFeatures = window.util.getRandomInt(0, offerPossibleFeatures.length - 1);
      const numberOfPhotos = window.util.getRandomInt(0, offerPossiblePhotos.length - 1);
      const location = {
        x: window.util.getRandomInt(0, mapBlock.clientWidth),
        y: window.util.getRandomInt(LOCATION_Y_MIN, LOCATION_Y_MAX)
      };

      result[i] = {
        "author": {
          "avatar": `img/avatars/user0${i + 1}.png`
        },
        "offer": {
          "title": `Жильё мечты`,
          "address": `${location.x}, ${location.y}`,
          "price": window.util.getRandomInt(10000, 100000),
          "type": window.util.getRandomElem(offerTypes),
          "rooms": window.util.getRandomInt(1, 4),
          "guests": window.util.getRandomInt(1, 20),
          "checkin": window.util.getRandomElem(offerTimes),
          "checkout": window.util.getRandomElem(offerTimes),
          "features": window.util.getRandomArr(offerPossibleFeatures, numberOfFeatures),
          "description": `Центральное отопление, счетчики на все установлены. Не требует ремонта.
         Застекленная лоджия, 6 метров, сделана под ключ, подходит для расширения комнаты.`,
          "photos": window.util.getRandomArr(offerPossiblePhotos, numberOfPhotos)
        },
        "location": {
          "x": location.x,
          "y": location.y
        }
      };
    }

    return result;
  }

  window.data = {
    offers: offersData,
    locationY: {
      min: LOCATION_Y_MIN,
      max: LOCATION_Y_MAX
    }
  };
})();
