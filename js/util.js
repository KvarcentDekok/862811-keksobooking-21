"use strict";

(function () {
  const COUNT_PINS_MAX = 5;

  function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomElement(array) {
    return array[window.util.getRandomInt(0, array.length - 1)];
  }

  function getRandomArray(array, length) {
    let result = [];

    for (let i = 0; i < length; i++) {
      const index = window.util.getRandomInt(0, array.length - 1);

      if (!(result.indexOf(array[index]) + 1)) {
        result.push(array[index]);
      }
    }

    return result;
  }

  function toggleDisableState(elements, isDisable) {
    if (typeof elements === `object`) {
      for (let i = 0; i < elements.length; i++) {
        elements[i].disabled = isDisable;
      }
    } else {
      elements.disabled = isDisable;
    }
  }

  window.util = {
    MAX_PINS_COUNT: COUNT_PINS_MAX,
    getRandomInt: getRandomInteger,
    getRandomElem: getRandomElement,
    getRandomArr: getRandomArray,
    toggleDisable: toggleDisableState
  };
})();
