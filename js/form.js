"use strict";

const MessageType = {
  SUCCESS: `success`,
  ERROR: `error`
};

const mainBlock = document.querySelector(`main`);
const mapBlock = mainBlock.querySelector(`.map`);
const mainPin = mapBlock.querySelector(`.map__pin--main`);
const adForm = document.querySelector(`.ad-form`);
const adFormFieldsets = adForm.querySelectorAll(`fieldset`);
const addressInput = adForm.querySelector(`#address`);
const priceInput = adForm.querySelector(`#price`);
const roomNumberSelect = adForm.querySelector(`#room_number`);
const capacitySelect = adForm.querySelector(`#capacity`);
const typeSelect = adForm.querySelector(`#type`);
const timeinSelect = adForm.querySelector(`#timein`);
const timeoutSelect = adForm.querySelector(`#timeout`);
const avatarInput = adForm.querySelector(`#avatar`);
const avatarPreviewBlock = adForm.querySelector(`.ad-form-header__preview`);
const houseImageInput = adForm.querySelector(`#images`);
const houseImagePreviewBlock = adForm.querySelector(`.ad-form__photo`);
const resetButton = adForm.querySelector(`.ad-form__reset`);
const filtersForm = mapBlock.querySelector(`.map__filters`);
const filters = filtersForm.querySelectorAll(`select, fieldset`);
const mainPinLeft = mainPin.style.left;
const mainPinTop = mainPin.style.top;

function toggleAdFormDisable(isDisable) {
  window.util.toggleDisable(adFormFieldsets, isDisable);

  if (isDisable) {
    adForm.classList.add(window.util.ClassDisabled.AD_FORM);
  } else {
    adForm.classList.remove(window.util.ClassDisabled.AD_FORM);
  }
}

function toggleFiltersDisable(isDisable) {
  window.util.toggleDisable(filters, isDisable);
}

function addressFill() {
  const offsetX = mainPin.clientWidth / 2;

  let offsetY = mainPin.clientHeight;

  if (mapBlock.classList.contains(window.util.ClassDisabled.MAP)) {
    offsetY = offsetY / 2;
  }

  let pinX = Math.round(parseInt(mainPin.style.left, 10) + offsetX);
  let pinY = Math.round(parseInt(mainPin.style.top, 10) + offsetY);

  addressInput.value = `${pinX}, ${pinY}`;
}

function validateCapacity() {
  const selectedOption = roomNumberSelect.options[roomNumberSelect.selectedIndex];
  const validCapacityNumbers = selectedOption.dataset.valid.split(`, `);

  capacitySelect.setCustomValidity(``);

  if (!(validCapacityNumbers.indexOf(capacitySelect.value) + 1)) {
    const errorText = `Недопустимое значение при выбранном количестве комнат: ${roomNumberSelect.value}`;

    capacitySelect.setCustomValidity(errorText);
  }

  capacitySelect.reportValidity();
}

function validatePriceInput() {
  const selectedOption = typeSelect.options[typeSelect.selectedIndex];
  const validMinPrice = selectedOption.dataset.valid;

  priceInput.min = validMinPrice;
  priceInput.placeholder = validMinPrice;

  if (!priceInput.validity.valid && !priceInput.validity.valueMissing) {
    priceInput.reportValidity();
  }
}

function bindTimes(evt) {
  if (evt.target === timeinSelect) {
    timeoutSelect.value = timeinSelect.value;
  } else if (evt.target === timeoutSelect) {
    timeinSelect.value = timeoutSelect.value;
  }
}

function submitForm(evt) {
  evt.preventDefault();

  window.data.save(new FormData(adForm), onSuccessSubmit, onErrorSubmit);
}

function onSuccessSubmit() {
  window.main.blockState();

  showMessage(MessageType.SUCCESS);
}

function onErrorSubmit() {
  showMessage(MessageType.ERROR);
}

function onClickCloseMessage(evt) {
  closeMessage(evt);
}

function onEscCloseMessage(evt) {
  if (evt.key === `Escape`) {
    closeMessage(evt);
  }
}

function showMessage(type) {
  const messageTemplate = document.querySelector(`#${type}`).content.querySelector(`.${type}`);
  const message = messageTemplate.cloneNode(true);

  mainBlock.appendChild(message);
  message.focus(); // for Firefox
  document.addEventListener(`click`, onClickCloseMessage);
  document.addEventListener(`keydown`, onEscCloseMessage);
}

function closeMessage(evt) {
  const message = document.querySelector(`.${MessageType.SUCCESS}, .${MessageType.ERROR}`);

  evt.preventDefault();

  message.remove();

  document.removeEventListener(`click`, onClickCloseMessage);
  document.removeEventListener(`keydown`, onEscCloseMessage);
}

function resetForm(evt) {
  if (evt) {
    evt.preventDefault();
  }

  adForm.reset();
  filtersForm.reset();
  window.pin.removeFromMap();
  window.card.close();
  validatePriceInput();

  mainPin.style.left = mainPinLeft;
  mainPin.style.top = mainPinTop;

  avatarPreviewBlock.innerHTML = ``;
  houseImagePreviewBlock.innerHTML = ``;

  window.form.fillAddress();
}

adForm.addEventListener(`submit`, (evt) => {
  submitForm(evt);
});

resetButton.addEventListener(`click`, (evt) => {
  window.main.blockState(evt);
});

roomNumberSelect.addEventListener(`change`, () => {
  validateCapacity();
});

capacitySelect.addEventListener(`change`, () => {
  validateCapacity();
});

typeSelect.addEventListener(`change`, () => {
  validatePriceInput();
});

priceInput.addEventListener(`input`, () => {
  validatePriceInput();
});

timeinSelect.addEventListener(`change`, (evt) => {
  bindTimes(evt);
});

timeoutSelect.addEventListener(`change`, (evt) => {
  bindTimes(evt);
});

avatarInput.addEventListener(`change`, () => {
  window.previewImage(avatarInput, avatarPreviewBlock);
});

houseImageInput.addEventListener(`change`, () => {
  window.previewImage(houseImageInput, houseImagePreviewBlock);
});

window.form = {
  toggleDisable: {
    adForm: toggleAdFormDisable,
    filters: toggleFiltersDisable
  },
  fillAddress: addressFill,
  validatePrice: validatePriceInput,
  reset: resetForm
};
