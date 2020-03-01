'use strict';

(function () {
  var mouseMoveSubscribes = [];

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

      mouseMoveSubscribes.forEach(function (handler) {
        handler(shift);
      });
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function setMouseMoveCb(callback) {
    if (typeof callback === 'function') {
      mouseMoveSubscribes.push(callback);
    }
  }

  window.drag = {
    setMouseMoveCb: setMouseMoveCb,
    onMouseDown: onMouseDown
  };
})();
