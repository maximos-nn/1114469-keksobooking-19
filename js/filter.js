'use strict';

(function () {
  var filters = document.querySelector('.map__filters');
  var filterControls = filters.querySelectorAll('select, fieldset');
  var housingType = filters.querySelector('#housing-type');
  var housingPrice = filters.querySelector('#housing-price');
  var housingRooms = filters.querySelector('#housing-rooms');
  var housingGuests = filters.querySelector('#housing-guests');
  var subscriber;

  function getFormData() {
    var checkedHousingFeatures = filters.querySelectorAll('#housing-features input:checked');
    var filterData = {};
    filterData[window.dataFilter.Type.HOUSING_TYPE] = housingType.value;
    filterData[window.dataFilter.Type.HOUSING_PRICE] = housingPrice.value;
    filterData[window.dataFilter.Type.HOUSING_ROOMS] = housingRooms.value;
    filterData[window.dataFilter.Type.HOUSING_GUESTS] = housingGuests.value;
    filterData[window.dataFilter.Type.HOUSING_FEATURES] = Array.from(checkedHousingFeatures).map(function (feature) {
      return feature.value;
    });
    return filterData;
  }

  function onFilterFormChange() {
    window.dataFilter.set(getFormData());
    if (typeof subscriber === 'function') {
      subscriber();
    }
  }

  function toggle(active) {
    filterControls.forEach(function (control) {
      control.disabled = !active;
    });
    if (!active) {
      filters.reset();
      window.dataFilter.set(getFormData());
    }
  }

  function setChangeCb(callback) {
    subscriber = callback;
  }

  filters.addEventListener('change', window.utils.debounce(onFilterFormChange));

  window.filter = {
    toggle: toggle,
    setChangeCb: setChangeCb
  };
})();
