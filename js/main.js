'use strict';

(function () {
  var MAIN_MOUSE_BUTTON = 0;
  var ENTER_KEY = 'Enter';
  var customPin = document.querySelector('.map__pin--main');
  var isPageActive = false;

  function onCustomPinMousedown(evt) {
    if (evt.button === MAIN_MOUSE_BUTTON && !isPageActive) {
      isPageActive = true;
      togglePage(isPageActive);
      // addressField.value = getCustomPinAddress();
    }
  }

  function onCustomPinEnterKey(evt) {
    if (evt.key === ENTER_KEY && !isPageActive) {
      isPageActive = true;
      togglePage(isPageActive);
    }
  }

  function togglePage(active) {
    window.map.toggleMap(active);
    window.toggleForm(active);
  }

  customPin.addEventListener('mousedown', onCustomPinMousedown);
  customPin.addEventListener('keydown', onCustomPinEnterKey);

  togglePage(isPageActive);
})();
