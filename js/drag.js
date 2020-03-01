'use strict';

(function () {
  var mouseMoveSubscribes = [];

  function onMouseDown(evt) {
    if (evt.button !== window.utils.Const.MAIN_MOUSE_BUTTON) {
      return;
    }
    evt.preventDefault();

    var startCoords = new window.position.Position(evt.clientX, evt.clientY);

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var oldCoords = startCoords;
      startCoords = new window.position.Position(moveEvt.clientX, moveEvt.clientY);

      mouseMoveSubscribes.forEach(function (handler) {
        handler(oldCoords.getShift(startCoords));
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
