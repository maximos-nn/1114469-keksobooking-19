'use strict';

(function () {
  var ROOMS_FOR_GUESTS = {
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

  function toggleForm(active) {
    var sets = advertForm.querySelectorAll('fieldset');
    for (var i = 0; i < sets.length; i++) {
      sets[i].disabled = !active;
    }
    if (active) {
      advertForm.classList.remove('ad-form--disabled');
    } else {
      advertForm.classList.add('ad-form--disabled');
    }
  }

  function validateGuests() {
    var validGuestsOptions = ROOMS_FOR_GUESTS[rooms.value];
    var guestsOptions = guests.querySelectorAll('option');
    guestsOptions.forEach(function (currentOption) {
      currentOption.disabled = true;
      currentOption.selected = false;
      var index = validGuestsOptions.indexOf(currentOption.value);
      if (index >= 0) {
        currentOption.disabled = false;
        if (index === 0) {
          currentOption.selected = true;
        }
      }
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
    var price = window.data.getPrice(housingType.value);
    minPrice.min = price;
    minPrice.placeholder = price;
  }

  function onHousingTypeChange() {
    validateMinPrice();
  }

  addressField.value = window.map.getCustomPinAddress();
  rooms.addEventListener('change', onRoomSelectChange);
  timeIn.addEventListener('change', onTimeInChange);
  timeOut.addEventListener('change', onTimeOutChange);
  housingType.addEventListener('change', onHousingTypeChange);
  validateGuests();
  validateCheckTimes(true);
  validateMinPrice();

  window.form = {
    toggleForm: toggleForm,
    addressField: addressField
  };
})();
