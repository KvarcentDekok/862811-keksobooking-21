"use strict";

(function () {
  const filtersForm = document.querySelector(`.map__filters`);
  const typeFilter = filtersForm.querySelector(`#housing-type`);

  let offersData = [];

  function applyFilters(cb) {
    return function (offers) {
      const filters = {
        pinsCount: window.pin.maxPinsCount,
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
