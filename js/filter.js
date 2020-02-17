'use strict';

(function () {
  var filters = document.querySelector('.map__filters');
  var housingType = filters.querySelector('#housing-type');
  var subscriber;

  function onFilterFormChange() {
    var filterData = {};
    filterData[window.data.FilterType.HOUSING_TYPE] = housingType.value;
    window.data.setFilter(filterData);
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
