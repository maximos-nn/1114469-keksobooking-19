'use strict';

(function () {
  var PIN_OFFSET_X = -25;
  var PIN_OFFSET_Y = -70;
  var ENTER_KEY = 'Enter';
  var PIN_NIB_HEIGHT = 16;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var customPin = mapPins.querySelector('.map__pin--main');
  var filters = map.querySelector('.map__filters');
  var isMapActive = false;

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
      if (evt.key === ENTER_KEY) {
        window.showCard(map, advert);
      }
    });
    return pinElement;
  }

  function renderPins(container, adverts) {
    adverts.forEach(function (advert) {
      container.appendChild(createPin(advert));
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
      renderPins(mapPins, window.data.createAdverts());
    } else {
      map.classList.add('map--faded');
    }
    toggleFilters(active);
  }

  function getCustomPinAddress() {
    var width = customPin.offsetWidth;
    var height = customPin.offsetHeight;
    var x = Math.floor(customPin.offsetLeft + width / 2);
    if (!isMapActive) {
      return x + ', ' + Math.floor(customPin.offsetTop + height / 2);
    }
    return x + ', ' + Math.floor(customPin.offsetTop + height + PIN_NIB_HEIGHT);
  }

  window.map = {
    toggleMap: toggleMap,
    getCustomPinAddress: getCustomPinAddress
  };
})();
