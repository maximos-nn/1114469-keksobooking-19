'use strict';

(function () {
  var ADVERT_COUNT = 5;
  var NO_FILTER = 'any';
  var HousingPrice = {
    Range: {LOW: 'low', MIDDLE: 'middle', HIGH: 'high'},
    Bound: {LOWER: 10000, UPPER: 50000}
  };
  var Type = {
    HOUSING_TYPE: 'ht',
    HOUSING_PRICE: 'hp',
    HOUSING_ROOMS: 'hr',
    HOUSING_GUESTS: 'hg',
    HOUSING_FEATURES: 'hf'
  };
  var filter = {};

  function isMatchingFilterHousingType(advert) {
    var value = filter[Type.HOUSING_TYPE];
    if (!value || value === NO_FILTER) {
      return true;
    }
    return advert.offer.type === value;
  }

  function isMatchingFilterHousingPrice(advert) {
    var value = filter[Type.HOUSING_PRICE];
    if (!value) {
      return true;
    }
    switch (value) {
      case HousingPrice.Range.LOW:
        return advert.offer.price < HousingPrice.Bound.LOWER;
      case HousingPrice.Range.MIDDLE:
        return advert.offer.price >= HousingPrice.Bound.LOWER && advert.offer.price <= HousingPrice.Bound.UPPER;
      case HousingPrice.Range.HIGH:
        return advert.offer.price > HousingPrice.Bound.UPPER;
      default:
        return true;
    }
  }

  function isMatchingFilterHousingRooms(advert) {
    var value = filter[Type.HOUSING_ROOMS];
    if (!value || value === NO_FILTER) {
      return true;
    }
    return advert.offer.rooms === Number(value);
  }

  function isMatchingFilterHousingGuests(advert) {
    var value = filter[Type.HOUSING_GUESTS];
    if (!value || value === NO_FILTER) {
      return true;
    }
    return advert.offer.guests === Number(value);
  }

  function isMatchingFilterHousingFeatures(advert) {
    var selectedFeatures = filter[Type.HOUSING_FEATURES];
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

  function set(filterData) {
    filter = filterData;
  }

  function apply(adverts) {
    if (Object.keys(filter).length) {
      return adverts.filter(onAdvertFilter).slice(0, ADVERT_COUNT);
    }
    return adverts.slice(0, ADVERT_COUNT);
  }

  window.dataFilter = {
    Type: Type,
    set: set,
    apply: apply
  };
})();
