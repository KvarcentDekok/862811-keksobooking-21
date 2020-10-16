"use strict";

(function () {
  const Price = {
    LOW: 10000,
    MIDDLE: 50000
  };

  const filtersForm = document.querySelector(`.map__filters`);
  const typeFilter = filtersForm.querySelector(`#housing-type`);
  const priceFilter = filtersForm.querySelector(`#housing-price`);
  const roomsFilter = filtersForm.querySelector(`#housing-rooms`);
  const guestsFilter = filtersForm.querySelector(`#housing-guests`);
  const featuresFilters = filtersForm.querySelector(`#housing-features`).querySelectorAll(`input`);

  let offersData = [];

  function applyFilters(cb) {
    return function (offers) {
      const checkedFeatures = Array.from(featuresFilters).filter(function (feature) {
        return feature.checked;
      });
      const filters = {
        pinsCount: window.util.MAX_PINS_COUNT,
        type: typeFilter.value,
        price: priceFilter.value,
        rooms: roomsFilter.value,
        guests: guestsFilter.value,
        features: checkedFeatures.map(function (feature) {
          return feature.value;
        })
      };

      offersData = offers;
      cb(offers, filters);
    };
  }

  function filterType(offers, filters) {
    if (filters.type !== window.util.CLEAR_FILTER_VALUE) {
      return offers.filter(function (value) {
        return value.offer.type === filters.type;
      });
    }

    return offers;
  }

  function filterPrice(offers, filters) {
    if (filters.price !== window.util.CLEAR_FILTER_VALUE) {
      return offers.filter(function (value) {
        switch (filters.price) {
          case `low`:
            return value.offer.price < Price.LOW;
          case `middle`:
            return value.offer.price >= Price.LOW && value.offer.price < Price.MIDDLE;
          case `high`:
            return value.offer.price > Price.MIDDLE;
          default:
            return false;
        }
      });
    }

    return offers;
  }

  function filterRooms(offers, filters) {
    if (filters.rooms !== window.util.CLEAR_FILTER_VALUE) {
      return offers.filter(function (value) {
        return value.offer.rooms === Number(filters.rooms);
      });
    }

    return offers;
  }

  function filterGuests(offers, filters) {
    if (filters.guests !== window.util.CLEAR_FILTER_VALUE) {
      return offers.filter(function (value) {
        return value.offer.guests === Number(filters.guests);
      });
    }

    return offers;
  }

  function filterFeatures(offers, filters) {
    if (filters.features.length) {
      return offers.filter(function (value) {
        let isSuit = true;

        for (let i = 0; i < filters.features.length; i++) {
          if (!(value.offer.features.indexOf(filters.features[i]) + 1)) {
            isSuit = false;
          }
        }

        return isSuit;
      });
    }

    return offers;
  }

  filtersForm.addEventListener(`change`, function () {
    window.card.close();
    window.pin.removeFromMap();
    window.pin.addOnMap(offersData);
  });

  window.filter = {
    apply: applyFilters,
    getData: {
      type: filterType,
      price: filterPrice,
      rooms: filterRooms,
      guests: filterGuests,
      features: filterFeatures
    }
  };
})();
