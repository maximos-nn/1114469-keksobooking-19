'use strict';

(function () {
  var MOCKS_COUNT = 8;
  var PIN_MIN_Y = 130;
  var PIN_MAX_Y = 630;
  var HOUSING = {
    'palace': {title: 'Дворец', minPrice: 10000},
    'flat': {title: 'Квартира', minPrice: 1000},
    'house': {title: 'Дом', minPrice: 5000},
    'bungalo': {title: 'Бунгало', minPrice: 0}
  };
  var TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var mapPins = document.querySelector('.map__pins');

  function createAdverts() {
    var adverts = [];
    for (var i = 1; i <= MOCKS_COUNT; i++) {
      var advert = {
        'author': {'avatar': 'img/avatars/user0' + i + '.png'},
        'offer': {
          'title': 'title' + i,
          'address': '',
          'price': window.utils.getRandomIntInclusive(500, 1000),
          'type': window.utils.getRandomElement(Object.keys(HOUSING)),
          'rooms': window.utils.getRandomIntInclusive(1, 4),
          'guests': window.utils.getRandomIntInclusive(1, 5),
          'checkin': window.utils.getRandomElement(TIMES),
          'checkout': window.utils.getRandomElement(TIMES),
          'features': window.utils.getRandomSubarray(FEATURES),
          'description': 'description' + i,
          'photos': window.utils.getRandomSubarray(PHOTOS)
        },
        'location': {
          x: window.utils.getRandomIntInclusive(0, mapPins.offsetWidth),
          y: window.utils.getRandomIntInclusive(PIN_MIN_Y, PIN_MAX_Y)
        }
      };
      advert.offer.address = advert.location.x + ', ' + advert.location.y;
      adverts[i - 1] = advert;
    }
    return adverts;
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
