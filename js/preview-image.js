"use strict";

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const UPLOAD_PHOTO_ALT = `Загруженное фото`;
const imgTemplate = document.querySelector(`.ad-form-header__preview img`);

const onReaderLoad = (previewBlock, reader) => {
  const preview = imgTemplate.cloneNode();
  const fragment = document.createDocumentFragment();

  preview.alt = UPLOAD_PHOTO_ALT;
  preview.src = reader.result;

  fragment.appendChild(preview);

  previewBlock.appendChild(fragment);
};

const changeImage = (fileChooser, previewBlock) => {
  const file = fileChooser.files[0];

  previewBlock.innerHTML = ``;

  if (file) {
    const fileType = file.type.toLowerCase();

    const matches = FILE_TYPES.some((it) => {
      return fileType.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, () => {
        onReaderLoad(previewBlock, reader);
      });

      reader.readAsDataURL(file);
    } else {
      fileChooser.value = ``;
    }
  }
};

window.previewImage = changeImage;
