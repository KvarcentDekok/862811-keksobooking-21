"use strict";

const LOAD_URL = `https://21.javascript.pages.academy/keksobooking/data`;
const SAVE_URL = `https://21.javascript.pages.academy/keksobooking`;
const TIMEOUT_IN_MS = 10000;

const StatusCode = {
  OK: 200
};

const onXhrLoad = (xhr, options) => {
  const message = `Статус ответа: ${xhr.status} ${xhr.statusText}`;

  if (xhr.status === StatusCode.OK) {
    options.onLoad(xhr.response);
  } else {
    options.onError(message);
  }
};

const onXhrError = (xhr, options) => {
  const message = `Произошла ошибка соединения: ${xhr.statusText}`;

  options.onError(message);
};

const onXhrTimeout = (xhr, options) => {
  const message = `Запрос не успел выполниться за ${xhr.timeout} мс`;

  options.onError(message);
};

const sendXhr = (options) => {
  const xhr = new XMLHttpRequest();

  xhr.responseType = `json`;
  xhr.timeout = TIMEOUT_IN_MS;

  xhr.addEventListener(`load`, () => {
    onXhrLoad(xhr, options);
  });

  xhr.addEventListener(`error`, () => {
    onXhrError(xhr, options);
  });

  xhr.addEventListener(`timeout`, () => {
    onXhrTimeout(xhr, options);
  });

  xhr.open(options.method, options.URL);
  xhr.send(options.data ? options.data : ``);
};

const loadData = (onLoad, onError) => {
  sendXhr({
    onLoad,
    onError,
    method: `GET`,
    URL: LOAD_URL
  });
};

const saveData = (data, onLoad, onError) => {
  sendXhr({
    onLoad,
    onError,
    method: `POST`,
    URL: SAVE_URL,
    data
  });
};

window.data = {
  save: saveData,
  load: loadData
};
