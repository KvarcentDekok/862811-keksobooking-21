"use strict";

(function () {
  const mapBlock = document.querySelector(`.map`);
  const mapPinsBlock = mapBlock.querySelector(`.map__pins`);

  mapPinsBlock.addEventListener(`click`, function (evt) {
    window.card.show(evt);
  });
})();
