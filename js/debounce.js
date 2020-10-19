"use strict";

const DEBOUNCE_INTERVAL = 500;

function debounceFunc(cb) {
  let lastTimeout = null;

  return function (...args) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(function () {
      cb(...args);
    }, DEBOUNCE_INTERVAL);
  };
}

window.debounce = debounceFunc;
