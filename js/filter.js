'use strict';

(function () {
  var filters = document.querySelector('.map__filters');
  var housingType = filters.querySelector('#housing-type');
  var subscriber;

  function onHousingTypeChange(evt) {
    var value = evt.currentTarget.value;
    if (value === 'any') {
      window.data.setFilter(window.data.FilterType.HOUSING_TYPE, null);
    } else {
      window.data.setFilter(window.data.FilterType.HOUSING_TYPE, value);
    }
  }

  function onFilterFormChange() {
    if (typeof subscriber === 'function') {
      subscriber();
    }
  }

  function addHandlers() {
    filters.addEventListener('change', onFilterFormChange);
    housingType.addEventListener('change', onHousingTypeChange);
  }

  function removeHandlers() {
    housingType.removeEventListener('change', onHousingTypeChange);
  }

  function toggleFilters(active) {
    var controls = filters.querySelectorAll('select, fieldset');
    controls.forEach(function (control) {
      control.disabled = !active;
    });
    if (active) {
      addHandlers();
    } else {
      removeHandlers();
    }
  }

  function setFilterChangeCb(callback) {
    subscriber = callback;
  }

  window.filter = {
    toggleFilters: toggleFilters,
    setFilterChangeCb: setFilterChangeCb
  };
})();
