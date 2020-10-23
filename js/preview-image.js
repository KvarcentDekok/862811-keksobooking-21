"use strict";

const FILE_TYPES = [`image/gif`, `image/jpg`, `image/jpeg`, `image/png`];
const UPLOAD_PHOTO_ALT = `Загруженное фото`;

function onReaderLoad(previewBlock, reader) {
  const preview = document.createElement(`img`);

  preview.alt = UPLOAD_PHOTO_ALT;
  preview.src = reader.result;

  previewBlock.appendChild(preview);
}

function changeImage(fileChooser, previewBlock) {
  const acceptTypes = fileChooser.accept ? fileChooser.accept.split(`, `) : FILE_TYPES;
  const file = fileChooser.files[0];

  previewBlock.innerHTML = ``;

  if (file) {
    const fileType = file.type;

    const matches = acceptTypes.some(function (type) {
      return fileType === type;
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, function () {
        onReaderLoad(previewBlock, reader);
      });

      reader.readAsDataURL(file);
    } else {
      fileChooser.value = ``;
    }
  }
}

window.previewImage = changeImage;
