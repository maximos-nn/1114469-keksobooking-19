'use strict';

(function () {
  var isAppActive = false;

  function toggleApp() {
    window.map.toggle(isAppActive);
    window.form.toggle(isAppActive);
  }

  function startApp() {
    isAppActive = true;
    toggleApp();
  }

  function stopApp() {
    isAppActive = false;
    toggleApp();
  }

  function onAppDataLoaded() {
    startApp();
  }

  function onCustomPinPositionChange(address) {
    window.form.setAddress(address);
  }

  function onSuccessFormSubmit() {
    stopApp();
  }

  function onFormReset() {
    stopApp();
  }

  function initApp() {
    window.map.setDataLoadedCb(onAppDataLoaded);
    window.map.setPinPositionChangeCb(onCustomPinPositionChange);
    window.form.setSuccessUploadCb(onSuccessFormSubmit);
    window.form.setResetCb(onFormReset);
    toggleApp();
  }

  initApp();
})();
