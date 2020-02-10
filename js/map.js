'use strict';

(function () {
  var PIN_OFFSET_X = -25;
  var PIN_OFFSET_Y = -70;
  var PIN_NIB_HEIGHT = 16;
  var PIN_MIN_Y = 130;
  var PIN_MAX_Y = 630;
  var PIN_MIN_X = 0;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var customPin = mapPins.querySelector('.map__pin--main');
  var filters = map.querySelector('.map__filters');
  var isMapActive = false;
  var PIN_MAX_X = mapPins.offsetWidth - 1;

  function createPin(advert) {
    var pinElement = pinTemplate.cloneNode(true);
    var img = pinElement.querySelector('img');
    pinElement.style.left = (advert.location.x + PIN_OFFSET_X) + 'px';
    pinElement.style.top = (advert.location.y + PIN_OFFSET_Y) + 'px';
    img.src = advert.author.avatar;
    img.alt = advert.offer.title;
    pinElement.addEventListener('click', function () {
      window.showCard(map, advert);
    });
    pinElement.addEventListener('keydown', function (evt) {
      if (evt.key === window.utils.const.ENTER_KEY) {
        window.showCard(map, advert);
      }
    });
    return pinElement;
  }

  function renderPins(container, adverts) {
    adverts.forEach(function (advert) {
      if ('offer' in advert) {
        container.appendChild(createPin(advert));
      }
    });
  }

  function toggleFilters(active) {
    var controls = filters.querySelectorAll('select, fieldset');
    for (var i = 0; i < controls.length; i++) {
      controls[i].disabled = !active;
    }
  }

  function toggleMap(active) {
    isMapActive = active;
    if (active) {
      map.classList.remove('map--faded');
      renderPins(mapPins, window.data.getAdverts());
    } else {
      map.classList.add('map--faded');
    }
    toggleFilters(active);
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
    if (validCoords.x > PIN_MAX_X) {
      validCoords.x = PIN_MAX_X;
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
    toggleMap: toggleMap,
    getCustomPinAddress: getCustomPinAddress,
    getCustomPinValidTopLeft: getCustomPinValidTopLeft,
    MIN_X: PIN_MIN_X,
    MIN_Y: PIN_MIN_Y,
    MAX_X: PIN_MAX_X,
    MAX_Y: PIN_MAX_Y
  };
})();
