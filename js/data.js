'use strict';

(function () {
  var HOUSING = {
    'palace': {title: 'Дворец', minPrice: 10000},
    'flat': {title: 'Квартира', minPrice: 1000},
    'house': {title: 'Дом', minPrice: 5000},
    'bungalo': {title: 'Бунгало', minPrice: 0}
  };
  var ADVERT_COUNT = 5;
  var adverts = [];
  var FilterType = {HOUSING_TYPE: 'ht'};
  var filter = {};

  function getAdvertsLoadSuccessHandler(onAdvertsCreated) {
    return function (data) {
      adverts = data;
      onAdvertsCreated();
    };
  }

  function onAdvertsLoadError(message) {
    window.message.showTransferError(message);
  }

  function createAdverts(onDone) {
    window.backend.load(getAdvertsLoadSuccessHandler(onDone), onAdvertsLoadError);
  }

  function filterHousingType(ads) {
    if (filter[FilterType.HOUSING_TYPE]) {
      return ads.filter(function (ad) {
        return ad.offer.type === filter[FilterType.HOUSING_TYPE];
      });
    }
    return ads;
  }

  function getAdverts() {
    if (Object.keys(filter).length) {
      return filterHousingType(adverts.slice()).slice(0, ADVERT_COUNT);
    }
    return adverts.slice(0, ADVERT_COUNT);
  }

  function getPrice(housing) {
    return HOUSING[housing].minPrice;
  }

  function getTitle(housing) {
    return HOUSING[housing].title;
  }

  function setFilter(type, value) {
    if (value) {
      filter[type] = value;
    } else {
      delete filter[type];
    }
  }

  window.data = {
    createAdverts: createAdverts,
    getAdverts: getAdverts,
    getPrice: getPrice,
    getTitle: getTitle,
    FilterType: FilterType,
    setFilter: setFilter
  };
})();
