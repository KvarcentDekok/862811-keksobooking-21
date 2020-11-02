"use strict";

const Price = {
  LOW: 10000,
  MIDDLE: 50000
};
const PriceLevel = {
  LOW: `low`,
  MIDDLE: `middle`,
  HIGH: `high`
};

const filtersForm = document.querySelector(`.map__filters`);
const typeFilter = filtersForm.querySelector(`#housing-type`);
const priceFilter = filtersForm.querySelector(`#housing-price`);
const roomsFilter = filtersForm.querySelector(`#housing-rooms`);
const guestsFilter = filtersForm.querySelector(`#housing-guests`);
const featuresFilters = filtersForm.querySelector(`#housing-features`).querySelectorAll(`input`);

let offersData = [];

const applyFilters = (cb) => {
  return (offers) => {
    const checkedFeatures = Array.from(featuresFilters).filter((feature) => {
      return feature.checked;
    });
    const filters = {
      pinsCount: window.util.MAX_PINS_COUNT,
      type: typeFilter.value,
      price: priceFilter.value,
      rooms: roomsFilter.value,
      guests: guestsFilter.value,
      features: checkedFeatures.map((feature) => {
        return feature.value;
      })
    };

    offersData = offers;

    offers = filterType(offers, filters);
    offers = filterPrice(offers, filters);
    offers = filterRooms(offers, filters);
    offers = filterGuests(offers, filters);
    offers = filterFeatures(offers, filters);

    cb(offers, filters.pinsCount);
  };
};

const filterType = (offers, filters) => {
  if (filters.type !== window.util.CLEAR_FILTER_VALUE) {
    return offers.filter((value) => {
      return value.offer.type === filters.type;
    });
  }

  return offers;
};

const filterPrice = (offers, filters) => {
  if (filters.price !== window.util.CLEAR_FILTER_VALUE) {
    return offers.filter((value) => {
      switch (filters.price) {
        case PriceLevel.LOW:
          return value.offer.price < Price.LOW;
        case PriceLevel.MIDDLE:
          return value.offer.price >= Price.LOW && value.offer.price < Price.MIDDLE;
        case PriceLevel.HIGH:
          return value.offer.price > Price.MIDDLE;
        default:
          return false;
      }
    });
  }

  return offers;
};

const filterRooms = (offers, filters) => {
  if (filters.rooms !== window.util.CLEAR_FILTER_VALUE) {
    return offers.filter((value) => {
      return value.offer.rooms === Number(filters.rooms);
    });
  }

  return offers;
};

const filterGuests = (offers, filters) => {
  if (filters.guests !== window.util.CLEAR_FILTER_VALUE) {
    return offers.filter((value) => {
      return value.offer.guests === Number(filters.guests);
    });
  }

  return offers;
};

const filterFeatures = (offers, filters) => {
  if (filters.features.length) {
    return offers.filter((value) => {
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
};

filtersForm.addEventListener(`change`, () => {
  window.card.close();
  window.pin.removeFromMap();
  window.pin.addOnMap(offersData);
});

window.filter = applyFilters;
