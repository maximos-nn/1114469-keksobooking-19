'use strict';

(function () {
  var customPin = document.querySelector('.map__pin--main');
  var isAppActive = false;

  function togglePage(active) {
    window.map.toggleMap(active);
    window.form.toggleForm(active);
  }

  function startApp() {
    isAppActive = true;
    togglePage(isAppActive);
  }

  function onAppDataLoaded() {
    startApp();
  }

  function onCustomPinMousedown(evt) {
    if (evt.button === window.utils.const.MAIN_MOUSE_BUTTON && !isAppActive) {
      window.data.createAdverts(onAppDataLoaded);
    }
  }

  function onCustomPinEnterKey(evt) {
    if (evt.key === window.utils.const.ENTER_KEY && !isAppActive) {
      window.data.createAdverts(onAppDataLoaded);
    }
  }

  function onSuccessFormSubmit() {
    isAppActive = false;
    window.map.resetMap();
    togglePage(isAppActive);
  }

  function initApp() {
    togglePage(isAppActive);
    customPin.addEventListener('mousedown', onCustomPinMousedown);
    customPin.addEventListener('keydown', onCustomPinEnterKey);
    window.pinSetDragHandler(customPin);
    window.form.setSuccessFormUploadCb(onSuccessFormSubmit);
  }

  initApp();
})();
