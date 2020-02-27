'use strict';

(function () {
  var PIN_OFFSET_X = -25;
  var PIN_OFFSET_Y = -70;
  var PIN_NIB_HEIGHT = 16;
  var PIN_MIN_Y = 130;
  var PIN_MAX_Y = 630;
  var PIN_MIN_X = 0;
  var MAIN_PIN_DEFAULT_LEFT = '570px';
  var MAIN_PIN_DEFAULT_TOP = '375px';

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var customPin = mapPins.querySelector('.map__pin--main');
  var isMapActive = false;
  var pinMaxX = mapPins.offsetWidth - 1;

  function setPinActive(currentPin) {
    mapPins.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (pin) {
      pin.classList.remove('map__pin--active');
    });
    currentPin.classList.add('map__pin--active');
  }

  function clear() {
    window.card.close();
    mapPins.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (pin) {
      pin.remove();
    });
  }

  function reset() {
    clear();
    customPin.style.left = MAIN_PIN_DEFAULT_LEFT;
    customPin.style.top = MAIN_PIN_DEFAULT_TOP;
    window.form.addressField.value = getCustomPinAddress();
  }

  function createPin(advert) {
    var pin = pinTemplate.cloneNode(true);
    var img = pin.querySelector('img');
    pin.style.left = (advert.location.x + PIN_OFFSET_X) + 'px';
    pin.style.top = (advert.location.y + PIN_OFFSET_Y) + 'px';
    img.src = advert.author.avatar;
    img.alt = advert.offer.title;
    pin.addEventListener('click', function (evt) {
      setPinActive(evt.currentTarget);
      window.card.show(map, advert);
    });
    pin.addEventListener('keydown', function (evt) {
      if (evt.key === window.utils.Const.ENTER_KEY) {
        setPinActive(evt.currentTarget);
        window.card.show(map, advert);
      }
    });
    return pin;
  }

  function renderPins(container, adverts) {
    adverts.forEach(function (advert) {
      container.appendChild(createPin(advert));
    });
  }

  function onFilterFormChange() {
    clear();
    renderPins(mapPins, window.data.getAdverts());
  }

  function toggle(active) {
    isMapActive = active;
    if (active) {
      map.classList.remove('map--faded');
      renderPins(mapPins, window.data.getAdverts());
      window.filter.setChangeCb(onFilterFormChange);
    } else {
      map.classList.add('map--faded');
      window.filter.setChangeCb(null);
    }
    window.filter.toggle(active);
  }

  function getCustomPinCoordsFromTopLeft(top, left) {
    var height = customPin.offsetHeight;
    var x = Math.floor(left + customPin.offsetWidth / 2);
    if (!isMapActive) {
      return {x: x, y: Math.floor(top + height / 2)};
    }
    return {x: x, y: Math.floor(top + height + PIN_NIB_HEIGHT)};
  }

  function getCustomPinValidCoords(coords) {
    var validCoords = {x: coords.x, y: coords.y};
    if (validCoords.x < PIN_MIN_X) {
      validCoords.x = PIN_MIN_X;
    }
    if (validCoords.x > pinMaxX) {
      validCoords.x = pinMaxX;
    }
    if (validCoords.y < PIN_MIN_Y) {
      validCoords.y = PIN_MIN_Y;
    }
    if (validCoords.y > PIN_MAX_Y) {
      validCoords.y = PIN_MAX_Y;
    }
    return validCoords;
  }

  function getCustomPinValidTopLeft(top, left) {
    var coords = getCustomPinCoordsFromTopLeft(top, left);
    var validCoords = getCustomPinValidCoords(coords);
    return {
      top: top + validCoords.y - coords.y,
      left: left + validCoords.x - coords.x
    };
  }

  function getCustomPinAddress() {
    var coords = getCustomPinCoordsFromTopLeft(customPin.offsetTop, customPin.offsetLeft);
    return coords.x + ', ' + coords.y;
  }

  window.map = {
    toggle: toggle,
    getCustomPinAddress: getCustomPinAddress,
    getCustomPinValidTopLeft: getCustomPinValidTopLeft,
    reset: reset,
    MIN_X: PIN_MIN_X,
    MIN_Y: PIN_MIN_Y,
    MAX_X: pinMaxX,
    MAX_Y: PIN_MAX_Y
  };
})();
