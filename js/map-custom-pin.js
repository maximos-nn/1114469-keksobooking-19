'use strict';

(function () {
  var MAIN_PIN_DEFAULT_LEFT = '570px';
  var MAIN_PIN_DEFAULT_TOP = '375px';
  var PIN_NIB_HEIGHT = 16;
  var PIN_MIN_Y = 130;
  var PIN_MAX_Y = 630;
  var PIN_MIN_X = 0;
  var pinMaxX;
  var pin;
  var posConstraints;
  var positionChangeSubscribes = [];
  var proceedSubscribes = [];
  var isActive = false;

  function getCoords() {
    var height = pin.offsetHeight;
    var x = Math.floor(pin.offsetLeft + pin.offsetWidth / 2);
    if (!isActive) {
      return new window.position.Position(x, Math.floor(pin.offsetTop + height / 2));
    }
    return new window.position.Position(x, Math.floor(pin.offsetTop + height + PIN_NIB_HEIGHT));
  }

  function getAddress() {
    var coords = getCoords();
    return coords.x + ', ' + coords.y;
  }

  function setPosition(shift) {
    var oldPos = getCoords();
    var newValidPos = new window.position.Position(oldPos.x + shift.x, oldPos.y + shift.y, posConstraints);
    var diff = oldPos.getShift(newValidPos);

    pin.style.top = pin.offsetTop + diff.y + 'px';
    pin.style.left = pin.offsetLeft + diff.x + 'px';
  }

  function reset() {
    pin.style.left = MAIN_PIN_DEFAULT_LEFT;
    pin.style.top = MAIN_PIN_DEFAULT_TOP;
    callPosChangeHandlers();
  }

  function init(container) {
    pinMaxX = container.offsetWidth - 1;
    pin = container.querySelector('.map__pin--main');
    posConstraints = new window.position.PositionConstraints(PIN_MIN_X, PIN_MIN_Y, pinMaxX, PIN_MAX_Y);

    pin.addEventListener('mousedown', onMousedown);
    pin.addEventListener('keydown', onEnterKey);
    pin.addEventListener('mousedown', window.drag.onMouseDown);
    window.drag.setMouseMoveCb(onDrag);
  }

  function toggle(active) {
    isActive = active;
  }

  function setPositionChangeCb(callback) {
    if (typeof callback === 'function') {
      positionChangeSubscribes.push(callback);
    }
  }

  function setProceedCb(callback) {
    if (typeof callback === 'function') {
      proceedSubscribes.push(callback);
    }
  }

  function callProceedHandlers() {
    proceedSubscribes.forEach(function (handler) {
      handler();
    });
  }

  function callPosChangeHandlers() {
    var address = getAddress();
    positionChangeSubscribes.forEach(function (handler) {
      handler(address);
    });
  }

  function onMousedown(evt) {
    if (evt.button === window.utils.Const.MAIN_MOUSE_BUTTON && !isActive) {
      callProceedHandlers();
    }
  }

  function onEnterKey(evt) {
    if (evt.key === window.utils.Const.ENTER_KEY && !isActive) {
      callProceedHandlers();
    }
  }

  function onDrag(shift) {
    setPosition(shift);
    callPosChangeHandlers();
  }

  window.mapCustomPin = {
    setPositionChangeCb: setPositionChangeCb,
    setProceedCb: setProceedCb,
    init: init,
    reset: reset,
    toggle: toggle
  };
})();
