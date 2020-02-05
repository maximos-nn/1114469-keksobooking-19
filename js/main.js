'use strict';

var MOCKS_COUNT = 8;
var PIN_OFFSET_X = -25;
var PIN_OFFSET_Y = -70;
var PIN_MIN_Y = 130;
var PIN_MAX_Y = 630;
var TYPES = {'palace': 'Дворец', 'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var ENTER_KEY = 'Enter';
var PIN_NIB_HEIGHT = 16;
var MAIN_MOUSE_BUTTON = 0;
var ROOMS_FOR_GUESTS = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0']
};

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var customPin = mapPins.querySelector('.map__pin--main');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var advertForm = document.querySelector('.ad-form');
var addressField = advertForm.querySelector('#address');
var rooms = advertForm.querySelector('#room_number');
var guests = advertForm.querySelector('#capacity');
var filters = map.querySelector('.map__filters');
var isPageActive = false;

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
        'type': getRandomElement(Object.keys(TYPES)),
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
  map.insertBefore(createCard(ads[0]), map.querySelector('.map__filters-container'));
}

function renderFeatures(container, features) {
  container.innerHTML = '';
  features.forEach(function (item) {
    container.innerHTML += '<li class="popup__feature popup__feature--' + item + '"></li>';
  });
}

function renderPhotos(container, photos) {
  container.innerHTML = '';
  photos.forEach(function (item) {
    container.innerHTML += '<img src="' + item + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
  });
}

function createCard(advert) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = advert.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = advert.offer.address;
  cardElement.querySelector('.popup__text--price').innerHTML = advert.offer.price + ' ₽<span>/ночь</span>';
  cardElement.querySelector('.popup__type').textContent = TYPES[advert.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = advert.offer.description;
  cardElement.querySelector('.popup__avatar').src = advert.author.avatar;
  renderFeatures(cardElement.querySelector('.popup__features'), advert.offer.features);
  renderPhotos(cardElement.querySelector('.popup__photos'), advert.offer.photos);
  return cardElement;
}

function toggleForm(active) {
  var sets = advertForm.querySelectorAll('fieldset');
  for (var i = 0; i < sets.length; i++) {
    sets[i].disabled = !active;
  }
  if (active) {
    advertForm.classList.remove('ad-form--disabled');
  } else {
    advertForm.classList.add('ad-form--disabled');
  }
}

function toggleFilters(active) {
  var controls = filters.querySelectorAll('select, fieldset');
  for (var i = 0; i < controls.length; i++) {
    controls[i].disabled = !active;
  }
}

function togglePage(active) {
  if (active) {
    map.classList.remove('map--faded');
    showData();
  } else {
    map.classList.add('map--faded');
  }
  toggleFilters(active);
  toggleForm(active);
}

function onCustomPinMousedown(evt) {
  if (evt.button === MAIN_MOUSE_BUTTON && !isPageActive) {
    isPageActive = true;
    togglePage(isPageActive);
    addressField.value = getCustomPinAddress();
  }
}

function onCustomPinEnterKey(evt) {
  if (evt.key === ENTER_KEY && !isPageActive) {
    isPageActive = true;
    togglePage(isPageActive);
  }
}

function getCustomPinAddress() {
  var width = customPin.offsetWidth;
  var height = customPin.offsetHeight;
  var x = Math.floor(customPin.offsetLeft + width / 2);
  if (!isPageActive) {
    return x + ', ' + Math.floor(customPin.offsetTop + height / 2);
  }
  return x + ', ' + Math.floor(customPin.offsetTop + height + PIN_NIB_HEIGHT);
}

function validateGuests() {
  var validGuestsOptions = ROOMS_FOR_GUESTS[rooms.value];
  var guestsOptions = guests.querySelectorAll('option');
  guestsOptions.forEach(function (currentOption) {
    currentOption.disabled = true;
    currentOption.selected = false;
    var index = validGuestsOptions.indexOf(currentOption.value);
    if (index >= 0) {
      currentOption.disabled = false;
      if (index === 0) {
        currentOption.selected = true;
      }
    }
  });
}

function onRoomSelectChange() {
  validateGuests();
}

addressField.value = getCustomPinAddress();
customPin.addEventListener('mousedown', onCustomPinMousedown);
customPin.addEventListener('keydown', onCustomPinEnterKey);
rooms.addEventListener('change', onRoomSelectChange);
togglePage(isPageActive);
validateGuests();
