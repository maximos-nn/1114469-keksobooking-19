'use strict';

(function () {
  var HOUSING = {
    'palace': {title: 'Дворец', minPrice: 10000},
    'flat': {title: 'Квартира', minPrice: 1000},
    'house': {title: 'Дом', minPrice: 5000},
    'bungalo': {title: 'Бунгало', minPrice: 0}
  };
  var ADVERT_COUNT = 5;
  var NO_FILTER = 'any';
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

  function sameHousingType(advert) {
    var value = filter[FilterType.HOUSING_TYPE];
    if (!value || value === NO_FILTER) {
      return true;
    }
    return advert.offer.type === value;
  }

  function filterCallback(advert) {
    return sameHousingType(advert);
  }

  function getAdverts() {
    if (Object.keys(filter).length) {
      return adverts.filter(filterCallback).slice(0, ADVERT_COUNT);
    }
    return adverts.slice(0, ADVERT_COUNT);
  }

  function getPrice(housing) {
    return HOUSING[housing].minPrice;
  }

  function getTitle(housing) {
    return HOUSING[housing].title;
  }

  function setFilter(filterData) {
    filter = filterData;
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
