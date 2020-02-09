'use strict';

(function () {
  var customPin = document.querySelector('.map__pin--main');
  var isPageActive = false;

  function onCustomPinMousedown(evt) {
    if (evt.button === window.utils.const.MAIN_MOUSE_BUTTON && !isPageActive) {
      isPageActive = true;
      togglePage(isPageActive);
      // addressField.value = getCustomPinAddress();
    }
  }

  function onCustomPinEnterKey(evt) {
    if (evt.key === window.utils.const.ENTER_KEY && !isPageActive) {
      isPageActive = true;
      togglePage(isPageActive);
    }
  }

  function togglePage(active) {
    window.map.toggleMap(active);
    window.form.toggleForm(active);
  }

  customPin.addEventListener('mousedown', onCustomPinMousedown);
  customPin.addEventListener('keydown', onCustomPinEnterKey);
  window.pinSetDragHandler(customPin);

  togglePage(isPageActive);
})();
