'use strict';

var MOCKS_COUNT = 8;
var PIN_OFFSET_X = -25;
var PIN_OFFSET_Y = -70;
var PIN_MIN_Y = 130;
var PIN_MAX_Y = 630;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(array) {
  return array[getRandomInt(0, array.length)];
}

function shuffleArray(array) {
  var tmp;
  var current;
  var top = array.length;

  if (top) {
    while (--top) {
      current = Math.floor(Math.random() * top);
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
  }

  return array;
}

function getRandomSubarray(array) {
  return shuffleArray(array.slice()).slice(getRandomInt(0, array.length));
}

function createMocks() {
  var adverts = [];
  for (var i = 0; i < MOCKS_COUNT; i++) {
    var advert = {
      'author': {'avatar': 'img/avatars/user0' + (i + 1) + '.png'},
      'offer': {
        'title': 'title' + (i + 1),
        'address': '',
        'price': getRandomIntInclusive(500, 1000),
        'type': getRandomElement(TYPES),
        'rooms': getRandomIntInclusive(1, 4),
        'guests': getRandomIntInclusive(0, 5),
        'checkin': getRandomElement(TIMES),
        'checkout': getRandomElement(TIMES),
        'features': getRandomSubarray(FEATURES),
        'description': 'description' + (i + 1),
        'photos': getRandomSubarray(PHOTOS)
      },
      'location': {
        x: getRandomIntInclusive(0, mapPins.offsetWidth),
        y: getRandomIntInclusive(PIN_MIN_Y, PIN_MAX_Y)
      }
    };
    advert.offer.address = advert.location.x + ', ' + advert.location.y;
    adverts[i] = advert;
  }
  return adverts;
}

function renderPin(advert) {
  var pinElement = pinTemplate.cloneNode(true);
  var img = pinElement.querySelector('img');
  pinElement.style.left = (advert.location.x + PIN_OFFSET_X) + 'px';
  pinElement.style.top = (advert.location.y + PIN_OFFSET_Y) + 'px';
  img.src = advert.author.avatar;
  img.alt = advert.offer.title;
  return pinElement;
}

function showAdverts() {
  var adverts = createMocks();
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adverts.length; i++) {
    fragment.appendChild(renderPin(adverts[i]));
  }
  mapPins.appendChild(fragment);
  map.classList.remove('map--faded');
}

showAdverts();
