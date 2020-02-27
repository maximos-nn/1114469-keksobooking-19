'use strict';

(function () {
  var ADVERT_COUNT = 5;
  var NO_FILTER = 'any';
  var housingTypeMap = {
    'palace': {title: 'Дворец', minPrice: 10000},
    'flat': {title: 'Квартира', minPrice: 1000},
    'house': {title: 'Дом', minPrice: 5000},
    'bungalo': {title: 'Бунгало', minPrice: 0}
  };
  var FilterType = {
    HOUSING_TYPE: 'ht',
    HOUSING_PRICE: 'hp',
    HOUSING_ROOMS: 'hr',
    HOUSING_GUESTS: 'hg',
    HOUSING_FEATURES: 'hf'
  };
  var HousingPrice = {
    Range: {LOW: 'low', MIDDLE: 'middle', HIGH: 'high'},
    Bounds: {LOWER: 10000, UPPER: 50000}
  };
  var adverts = [];
  var filter = {};

  function getAdvertsLoadSuccessHandler(onAdvertsCreated) {
    return function (loadedAdverts) {
      adverts = loadedAdverts.filter(function (advert) {
        return 'offer' in advert;
      });
      onAdvertsCreated();
    };
  }

  function onAdvertsLoadError(message) {
    window.message.showTransferError(message);
  }

  function loadAdverts(onDone) {
    window.backend.load(getAdvertsLoadSuccessHandler(onDone), onAdvertsLoadError);
  }

  function isMatchingFilterHousingType(advert) {
    var value = filter[FilterType.HOUSING_TYPE];
    if (!value || value === NO_FILTER) {
      return true;
    }
    return advert.offer.type === value;
  }

  function isMatchingFilterHousingPrice(advert) {
    var value = filter[FilterType.HOUSING_PRICE];
    if (!value) {
      return true;
    }
    switch (value) {
      case HousingPrice.Range.LOW:
        return advert.offer.price < HousingPrice.Bounds.LOWER;
      case HousingPrice.Range.MIDDLE:
        return advert.offer.price >= HousingPrice.Bounds.LOWER && advert.offer.price <= HousingPrice.Bounds.UPPER;
      case HousingPrice.Range.HIGH:
        return advert.offer.price > HousingPrice.Bounds.UPPER;
      default:
        return true;
    }
  }

  function isMatchingFilterHousingRooms(advert) {
    var value = filter[FilterType.HOUSING_ROOMS];
    if (!value || value === NO_FILTER) {
      return true;
    }
    return advert.offer.rooms === Number(value);
  }

  function isMatchingFilterHousingGuests(advert) {
    var value = filter[FilterType.HOUSING_GUESTS];
    if (!value || value === NO_FILTER) {
      return true;
    }
    return advert.offer.guests === Number(value);
  }

  function isMatchingFilterHousingFeatures(advert) {
    var selectedFeatures = filter[FilterType.HOUSING_FEATURES];
    if (!Array.isArray(selectedFeatures) || selectedFeatures.length === 0) {
      return true;
    }
    if (!Array.isArray(advert.offer.features) || advert.offer.features.length === 0) {
      return false;
    }
    return selectedFeatures.every(function (selectedFeature) {
      return advert.offer.features.includes(selectedFeature);
    });
  }

  function onAdvertFilter(advert) {
    return isMatchingFilterHousingType(advert) &&
      isMatchingFilterHousingPrice(advert) &&
      isMatchingFilterHousingRooms(advert) &&
      isMatchingFilterHousingGuests(advert) &&
      isMatchingFilterHousingFeatures(advert);
  }

  function getAdverts() {
    if (Object.keys(filter).length) {
      return adverts.filter(onAdvertFilter).slice(0, ADVERT_COUNT);
    }
    return adverts.slice(0, ADVERT_COUNT);
  }

  function getPrice(housing) {
    return housingTypeMap[housing].minPrice;
  }

  function getTitle(housing) {
    return housingTypeMap[housing].title;
  }

  function setFilter(filterData) {
    filter = filterData;
  }

  window.data = {
    loadAdverts: loadAdverts,
    getAdverts: getAdverts,
    getPrice: getPrice,
    getTitle: getTitle,
    FilterType: FilterType,
    setFilter: setFilter
  };
})();
