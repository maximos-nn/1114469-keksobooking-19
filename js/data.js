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
  var FilterType = {
    HOUSING_TYPE: 'ht',
    HOUSING_PRICE: 'hp',
    HOUSING_ROOMS: 'hr',
    HOUSING_GUESTS: 'hg',
    HOUSING_FEATURES: 'hf'
  };
  var filter = {};
  var HousingPrice = {
    Range: {LOW: 'low', MIDDLE: 'middle', HIGH: 'high'},
    Bounds: {LOWER: 10000, UPPER: 50000}
  };

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

  function sameHousingPrice(advert) {
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

  function sameHousingRooms(advert) {
    var value = filter[FilterType.HOUSING_ROOMS];
    if (!value || value === NO_FILTER) {
      return true;
    }
    return advert.offer.rooms === Number(value);
  }

  function sameHousingGuests(advert) {
    var value = filter[FilterType.HOUSING_GUESTS];
    if (!value || value === NO_FILTER) {
      return true;
    }
    return advert.offer.guests === Number(value);
  }

  function sameHousingFeatures(advert) {
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

  function filterCallback(advert) {
    return sameHousingType(advert) &&
      sameHousingPrice(advert) &&
      sameHousingRooms(advert) &&
      sameHousingGuests(advert) &&
      sameHousingFeatures(advert);
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
