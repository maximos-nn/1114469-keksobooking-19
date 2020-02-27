'use strict';

(function () {
  var pin;

  function onMouseDown(evt) {
    if (evt.button !== window.utils.Const.MAIN_MOUSE_BUTTON) {
      return;
    }
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newCoords = window.map.getCustomPinValidTopLeft(
          pin.offsetTop - shift.y,
          pin.offsetLeft - shift.x
      );

      pin.style.top = newCoords.top + 'px';
      pin.style.left = newCoords.left + 'px';
      window.form.addressField.value = window.map.getCustomPinAddress();
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function setDragHandler(pinElement) {
    pin = pinElement;
    pin.addEventListener('mousedown', onMouseDown);
  }

  window.pinSetDragHandler = setDragHandler;
})();
