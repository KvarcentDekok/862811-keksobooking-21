"use strict";

const DEBOUNCE_INTERVAL = 500;

function debounceFunc(cb) {
  let lastTimeout = null;

  return (...args) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(() => {
      cb(...args);
    }, DEBOUNCE_INTERVAL);
  };
}

window.debounce = debounceFunc;
