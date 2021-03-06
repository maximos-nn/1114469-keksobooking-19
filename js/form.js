'use strict';

(function () {
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';
  var roomsCapacityMap = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };
  var advertForm = document.querySelector('.ad-form');
  var addressField = advertForm.querySelector('#address');
  var rooms = advertForm.querySelector('#room_number');
  var guests = advertForm.querySelector('#capacity');
  var timeIn = advertForm.querySelector('#timein');
  var timeOut = advertForm.querySelector('#timeout');
  var housingType = advertForm.querySelector('#type');
  var minPrice = advertForm.querySelector('#price');
  var resetBtn = advertForm.querySelector('.ad-form__reset');
  var avatarChooser = advertForm.querySelector('#avatar');
  var avatarPreview = advertForm.querySelector('.ad-form-header__preview img');
  var housingPhotoChooser = advertForm.querySelector('#images');
  var housingPhotoPreview = advertForm.querySelector('.ad-form__photo');
  var formUploadSubscribes = [];
  var formResetSubscribes = [];

  function toggle(active) {
    advertForm.querySelectorAll('fieldset').forEach(function (fieldset) {
      fieldset.disabled = !active;
    });
    if (active) {
      advertForm.classList.remove('ad-form--disabled');
    } else {
      advertForm.classList.add('ad-form--disabled');
    }
  }

  function validateGuests() {
    var validGuestsOptions = roomsCapacityMap[rooms.value];
    var guestsOptions = guests.querySelectorAll('option');
    guestsOptions.forEach(function (currentOption) {
      var index = validGuestsOptions.indexOf(currentOption.value);
      currentOption.disabled = index === -1;
      currentOption.selected = index === 0;
    });
  }

  function onRoomSelectChange() {
    validateGuests();
  }

  function validateCheckTimes(isTimeIn) {
    if (isTimeIn) {
      timeOut.value = timeIn.value;
    } else {
      timeIn.value = timeOut.value;
    }
  }

  function onTimeInChange() {
    validateCheckTimes(true);
  }

  function onTimeOutChange() {
    validateCheckTimes(false);
  }

  function validateMinPrice() {
    var price = window.data.getHousingMinPrice(housingType.value);
    minPrice.min = price;
    minPrice.placeholder = price;
  }

  function onHousingTypeChange() {
    validateMinPrice();
  }

  function setDefaults() {
    avatarPreview.src = DEFAULT_AVATAR;
    housingPhotoPreview.removeAttribute('style');
    validateGuests();
    validateCheckTimes(true);
    validateMinPrice();
  }

  function setSuccessUploadCb(callback) {
    if (typeof callback === 'function') {
      formUploadSubscribes.push(callback);
    }
  }

  function setResetCb(callback) {
    if (typeof callback === 'function') {
      formResetSubscribes.push(callback);
    }
  }

  function onResetClick(evt) {
    evt.preventDefault();
    advertForm.reset();
    setDefaults();
    formResetSubscribes.forEach(function (handler) {
      handler();
    });
  }

  function onFormUploadSuccess() {
    window.message.showSuccess();
    advertForm.reset();
    setDefaults();
    formUploadSubscribes.forEach(function (handler) {
      handler();
    });
  }

  function onFormUploadError(message) {
    window.message.showTransferError(message);
  }

  function onFormSubmit(evt) {
    evt.preventDefault();
    window.backend.save(new FormData(advertForm), onFormUploadSuccess, onFormUploadError);
  }

  function onAvatarLoad(avatar) {
    avatarPreview.src = avatar;
  }

  function onAvatarChooserChange() {
    window.utils.readFile(avatarChooser.files[0], onAvatarLoad);
  }

  function onHousingPhotoLoad(photo) {
    housingPhotoPreview.style.backgroundSize = 'cover';
    housingPhotoPreview.style.backgroundRepeat = 'no-repeat';
    housingPhotoPreview.style.backgroundPosition = 'center';
    housingPhotoPreview.style.backgroundImage = 'url(' + photo + ')';
  }

  function onHousingPhotoChooserChange() {
    window.utils.readFile(housingPhotoChooser.files[0], onHousingPhotoLoad);
  }

  function setAddress(address) {
    addressField.value = address;
  }

  rooms.addEventListener('change', onRoomSelectChange);
  timeIn.addEventListener('change', onTimeInChange);
  timeOut.addEventListener('change', onTimeOutChange);
  housingType.addEventListener('change', onHousingTypeChange);
  advertForm.addEventListener('submit', onFormSubmit);
  resetBtn.addEventListener('click', onResetClick);
  avatarChooser.addEventListener('change', onAvatarChooserChange);
  housingPhotoChooser.addEventListener('change', onHousingPhotoChooserChange);
  setDefaults();

  window.form = {
    toggle: toggle,
    setSuccessUploadCb: setSuccessUploadCb,
    setResetCb: setResetCb,
    setAddress: setAddress
  };
})();
