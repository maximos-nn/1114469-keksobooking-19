'use strict';

var MOCKS_COUNT = 8;
var PIN_OFFSET_X = -25;
var PIN_OFFSET_Y = -70;
var PIN_MIN_Y = 130;
var PIN_MAX_Y = 630;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TYPES_HUMAN_READABLE = {'palace': 'Дворец', 'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};
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
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

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

function createAdverts() {
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
        'guests': getRandomIntInclusive(1, 5),
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

function createPin(advert) {
  var pinElement = pinTemplate.cloneNode(true);
  var img = pinElement.querySelector('img');
  pinElement.style.left = (advert.location.x + PIN_OFFSET_X) + 'px';
  pinElement.style.top = (advert.location.y + PIN_OFFSET_Y) + 'px';
  img.src = advert.author.avatar;
  img.alt = advert.offer.title;
  return pinElement;
}

function renderPins(container, adverts) {
  adverts.forEach(function (advert) {
    container.appendChild(createPin(advert));
  });
}

function showData() {
  var ads = createAdverts();
  renderPins(mapPins, ads);
  map.classList.remove('map--faded');
  map.insertBefore(createCard(ads[0]), map.querySelector('.map__filters-container'));
}

function fillList(array, element, valueFunc) {
  if (array.length) {
    element.innerHTML = '';
    array.forEach(function (item) {
      element.innerHTML += valueFunc(item);
    });
  } else {
    element.remove();
  }
}

function fillTextField(element, property, value) {
  if (value) {
    element[property] = value;
  } else {
    element.remove();
  }
}

function fillField(condition, element, property, valueFunc) {
  if (condition) {
    element[property] = valueFunc();
  } else {
    element.remove();
  }
}

function createCard(advert) {
  var cardElement = cardTemplate.cloneNode(true);
  fillTextField(cardElement.querySelector('.popup__title'), 'textContent', advert.offer.title);
  fillTextField(cardElement.querySelector('.popup__text--address'), 'textContent', advert.offer.address);
  fillField(advert.offer.price, cardElement.querySelector('.popup__text--price'), 'innerHTML', function () {
    return advert.offer.price + ' ₽<span>/ночь</span>';
  });
  fillField(advert.offer.type, cardElement.querySelector('.popup__type'), 'textContent', function () {
    return TYPES_HUMAN_READABLE[advert.offer.type];
  });
  fillField(advert.offer.rooms && advert.offer.guests, cardElement.querySelector('.popup__text--capacity'), 'textContent', function () {
    return advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
  });
  fillField(advert.offer.checkin && advert.offer.checkout, cardElement.querySelector('.popup__text--time'), 'textContent', function () {
    return 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
  });
  fillList(advert.offer.features, cardElement.querySelector('.popup__features'), function (item) {
    return '<li class="popup__feature popup__feature--' + item + '"></li>';
  });
  fillTextField(cardElement.querySelector('.popup__description'), 'textContent', advert.offer.description);
  fillList(advert.offer.photos, cardElement.querySelector('.popup__photos'), function (item) {
    return '<img src="' + item + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
  });
  fillTextField(cardElement.querySelector('.popup__avatar'), 'src', advert.author.avatar);
  return cardElement;
}

showData();
