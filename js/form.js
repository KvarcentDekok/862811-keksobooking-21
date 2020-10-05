"use strict";

(function () {
  const mapBlock = document.querySelector(`.map`);
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
  const filters = mapBlock.querySelectorAll(`select, fieldset`);

  function toggleFormsDisable(isDisable) {
    window.util.toggleDisable(adFormFieldsets, isDisable);
    window.util.toggleDisable(filters, isDisable);

    if (isDisable) {
      adForm.classList.add(`ad-form--disabled`);
    } else {
      adForm.classList.remove(`ad-form--disabled`);
    }
  }

  function addressFill() {
    const offsetX = mainPin.clientWidth / 2;

    let offsetY = mainPin.clientHeight;

    if (mapBlock.classList.contains(`map--faded`)) {
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

  roomNumberSelect.addEventListener(`change`, function () {
    validateCapacity();
  });

  capacitySelect.addEventListener(`change`, function () {
    validateCapacity();
  });

  typeSelect.addEventListener(`change`, function () {
    validatePriceInput();
  });

  priceInput.addEventListener(`input`, function () {
    validatePriceInput();
  });

  timeinSelect.addEventListener(`change`, function (evt) {
    bindTimes(evt);
  });

  timeoutSelect.addEventListener(`change`, function (evt) {
    bindTimes(evt);
  });

  window.form = {
    toggleDisable: toggleFormsDisable,
    fillAddress: addressFill,
    validatePrice: validatePriceInput
  };
})();
