'use strict';

(function () {
  var HOUSING = {
    'palace': {title: 'Дворец', minPrice: 10000},
    'flat': {title: 'Квартира', minPrice: 1000},
    'house': {title: 'Дом', minPrice: 5000},
    'bungalo': {title: 'Бунгало', minPrice: 0}
  };

  function getAdvertsLoadSuccessHandler(onAdvertsCreated) {
    return function (adverts) {
      onAdvertsCreated(adverts);
    };
  }

  function onAdvertsLoadError(message) {
    window.message.showTransferError(message);
  }

  function createAdverts(onDone) {
    window.backend.load(getAdvertsLoadSuccessHandler(onDone), onAdvertsLoadError);
  }

  function getPrice(housing) {
    return HOUSING[housing].minPrice;
  }

  function getTitle(housing) {
    return HOUSING[housing].title;
  }

  window.data = {
    createAdverts: createAdverts,
    getPrice: getPrice,
    getTitle: getTitle
  };
})();
