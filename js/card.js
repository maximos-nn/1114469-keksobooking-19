'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var map;

  function renderFeatures(container, features) {
    if (!Array.isArray(features) || features.length === 0) {
      container.remove();
      return;
    }
    container.innerHTML = '';
    features.forEach(function (item) {
      container.innerHTML += '<li class="popup__feature popup__feature--' + item + '"></li>';
    });
  }

  function renderPhotos(container, photos) {
    if (!Array.isArray(photos) || photos.length === 0) {
      container.remove();
      return;
    }
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
    cardElement.querySelector('.popup__type').textContent = window.data.getTitle(advert.offer.type);
    cardElement.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = advert.offer.description;
    cardElement.querySelector('.popup__avatar').src = advert.author.avatar;
    renderFeatures(cardElement.querySelector('.popup__features'), advert.offer.features);
    renderPhotos(cardElement.querySelector('.popup__photos'), advert.offer.photos);
    cardElement.querySelector('.popup__close').addEventListener('click', function () {
      closeCard();
    });
    return cardElement;
  }

  function onCardEscPress(evt) {
    if (evt.key === window.utils.const.ESC_KEY) {
      closeCard();
    }
  }

  function closeCard() {
    var card = map.querySelector('.map__card');
    if (card) {
      card.remove();
      document.removeEventListener('keydown', onCardEscPress);
    }
  }

  function showCard(container, advert) {
    map = container;
    closeCard();
    map.insertBefore(createCard(advert), map.querySelector('.map__filters-container'));
    document.addEventListener('keydown', onCardEscPress);
  }

  window.card = {
    showCard: showCard,
    closeCard: closeCard
  };
})();
