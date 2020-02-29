'use strict';

(function () {
  var customPin = document.querySelector('.map__pin--main');
  var isAppActive = false;

  function togglePage() {
    window.map.toggle(isAppActive);
    window.form.toggle(isAppActive);
  }

  function startApp() {
    isAppActive = true;
    togglePage();
  }

  function onAppDataLoaded() {
    startApp();
  }

  function onCustomPinMousedown(evt) {
    if (evt.button === window.utils.Const.MAIN_MOUSE_BUTTON && !isAppActive) {
      window.data.loadAdverts(onAppDataLoaded);
    }
  }

  function onCustomPinEnterKey(evt) {
    if (evt.key === window.utils.Const.ENTER_KEY && !isAppActive) {
      window.data.loadAdverts(onAppDataLoaded);
    }
  }

  function stopApp() {
    isAppActive = false;
    togglePage();
    window.map.reset();
  }

  function onSuccessFormSubmit() {
    stopApp();
  }

  function onFormReset() {
    stopApp();
  }

  function initApp() {
    togglePage();
    customPin.addEventListener('mousedown', onCustomPinMousedown);
    customPin.addEventListener('keydown', onCustomPinEnterKey);
    window.pinSetDragHandler(customPin);
    window.form.setSuccessUploadCb(onSuccessFormSubmit);
    window.form.setResetCb(onFormReset);
  }

  initApp();
})();
