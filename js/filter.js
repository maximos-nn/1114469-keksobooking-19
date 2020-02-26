'use strict';

(function () {
  var filters = document.querySelector('.map__filters');
  var filterControls = filters.querySelectorAll('select, fieldset');
  var housingType = filters.querySelector('#housing-type');
  var housingPrice = filters.querySelector('#housing-price');
  var housingRooms = filters.querySelector('#housing-rooms');
  var housingGuests = filters.querySelector('#housing-guests');
  var housingFeatures = filters.querySelector('#housing-features');
  var subscriber;

  function getFilterData() {
    var checkedHousingFeatures = housingFeatures.querySelectorAll('input:checked');
    var filterData = {};
    filterData[window.data.FilterType.HOUSING_TYPE] = housingType.value;
    filterData[window.data.FilterType.HOUSING_PRICE] = housingPrice.value;
    filterData[window.data.FilterType.HOUSING_ROOMS] = housingRooms.value;
    filterData[window.data.FilterType.HOUSING_GUESTS] = housingGuests.value;
    filterData[window.data.FilterType.HOUSING_FEATURES] = Array.from(checkedHousingFeatures).map(function (feature) {
      return feature.value;
    });
    return filterData;
  }

  function onFilterFormChange() {
    window.data.setFilter(getFilterData());
    if (typeof subscriber === 'function') {
      subscriber();
    }
  }

  function toggleFilters(active) {
    filterControls.forEach(function (control) {
      control.disabled = !active;
    });
    if (!active) {
      housingFeatures.querySelectorAll('input:checked').forEach(function (control) {
        control.checked = false;
      });
    }
  }

  function setFilterChangeCb(callback) {
    subscriber = callback;
  }

  filters.addEventListener('change', window.utils.debounce(onFilterFormChange));

  window.filter = {
    toggleFilters: toggleFilters,
    setFilterChangeCb: setFilterChangeCb
  };
})();
