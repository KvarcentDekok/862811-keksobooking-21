"use strict";

(function () {
  const MAX_PINS_COUNT = 5;

  const filtersForm = document.querySelector(`.map__filters`);
  const typeFilter = filtersForm.querySelector(`#housing-type`);

  let offersData = [];

  function applyFilters(cb) {
    return function (offers) {
      const filters = {
        pinsCount: MAX_PINS_COUNT,
        type: typeFilter.value
      };

      offersData = offers;
      cb(offers, filters);
    };
  }

  filtersForm.addEventListener(`change`, function () {
    window.card.close();
    window.pin.removeFromMap();
    window.pin.addOnMap(offersData);
  });

  window.filter = applyFilters;
})();
