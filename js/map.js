'use strict';

(function () {
  var PIN_OFFSET_X = -25;
  var PIN_OFFSET_Y = -70;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var dataLoadedSubscribes = [];

  function deactivatePins() {
    mapPins.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (pin) {
      pin.classList.remove('map__pin--active');
    });
  }

  function setPinActive(currentPin) {
    deactivatePins();
    currentPin.classList.add('map__pin--active');
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
      window.card.show(map, advert, onCardClose);
    });
    pin.addEventListener('keydown', function (evt) {
      if (evt.key === window.utils.Const.ENTER_KEY) {
        setPinActive(evt.currentTarget);
        window.card.show(map, advert, onCardClose);
      }
    });
    return pin;
  }

  function renderPins(container, adverts) {
    adverts.forEach(function (advert) {
      container.appendChild(createPin(advert));
    });
  }

  function clear() {
    window.card.close();
    mapPins.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (pin) {
      pin.remove();
    });
  }

  function reset() {
    clear();
    window.mapCustomPin.reset();
  }

  function toggle(active) {
    window.mapCustomPin.toggle(active);
    if (active) {
      map.classList.remove('map--faded');
      renderPins(mapPins, window.data.getAdverts());
      window.filter.setChangeCb(onFilterFormChange);
    } else {
      reset();
      map.classList.add('map--faded');
      window.filter.setChangeCb(null);
    }
    window.filter.toggle(active);
  }

  function setDataLoadedCb(callback) {
    if (typeof callback === 'function') {
      dataLoadedSubscribes.push(callback);
    }
  }

  function setPinPositionChangeCb(callback) {
    window.mapCustomPin.setPositionChangeCb(callback);
  }

  function onFilterFormChange() {
    clear();
    renderPins(mapPins, window.data.getAdverts());
  }

  function onDataLoaded() {
    dataLoadedSubscribes.forEach(function (handler) {
      handler();
    });
  }

  function onCustomPinProceed() {
    window.data.loadAdverts(onDataLoaded);
  }

  function onCardClose() {
    deactivatePins();
  }

  window.mapCustomPin.init(mapPins);
  window.mapCustomPin.setProceedCb(onCustomPinProceed);

  window.map = {
    toggle: toggle,
    setDataLoadedCb: setDataLoadedCb,
    setPinPositionChangeCb: setPinPositionChangeCb
  };
})();
