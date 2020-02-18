'use strict';

(function () {
  var filters = document.querySelector('.map__filters');
  var housingType = filters.querySelector('#housing-type');
  var housingPrice = filters.querySelector('#housing-price');
  var housingRooms = filters.querySelector('#housing-rooms');
  var housingGuests = filters.querySelector('#housing-guests');
  var subscriber;

  function getFilterData() {
    var housingFeatures = filters.querySelectorAll('#housing-features input:checked');
    var filterData = {};
    filterData[window.data.FilterType.HOUSING_TYPE] = housingType.value;
    filterData[window.data.FilterType.HOUSING_PRICE] = housingPrice.value;
    filterData[window.data.FilterType.HOUSING_ROOMS] = housingRooms.value;
    filterData[window.data.FilterType.HOUSING_GUESTS] = housingGuests.value;
    filterData[window.data.FilterType.HOUSING_FEATURES] = Array.from(housingFeatures).map(function (feature) {
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
    var controls = filters.querySelectorAll('select, fieldset');
    controls.forEach(function (control) {
      control.disabled = !active;
    });
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
