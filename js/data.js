'use strict';

(function () {
  var housingTypeMap = {
    'palace': {title: 'Дворец', minPrice: 10000},
    'flat': {title: 'Квартира', minPrice: 1000},
    'house': {title: 'Дом', minPrice: 5000},
    'bungalo': {title: 'Бунгало', minPrice: 0}
  };
  var adverts = [];

  function getAdvertsLoadSuccessHandler(onAdvertsLoaded) {
    return function (loadedAdverts) {
      adverts = loadedAdverts.filter(function (advert) {
        return 'offer' in advert;
      });
      if (typeof onAdvertsLoaded === 'function') {
        onAdvertsLoaded();
      }
    };
  }

  function onAdvertsLoadError(message) {
    window.message.showTransferError(message);
  }

  function loadAdverts(onDone) {
    window.backend.load(getAdvertsLoadSuccessHandler(onDone), onAdvertsLoadError);
  }

  function getAdverts() {
    return window.dataFilter.apply(adverts);
  }

  function getHousingMinPrice(housing) {
    return housingTypeMap[housing].minPrice;
  }

  function getHousingTitle(housing) {
    return housingTypeMap[housing].title;
  }

  window.data = {
    loadAdverts: loadAdverts,
    getAdverts: getAdverts,
    getHousingMinPrice: getHousingMinPrice,
    getHousingTitle: getHousingTitle
  };
})();
