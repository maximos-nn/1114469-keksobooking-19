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

  function renderField(fieldElement, filedValue, valueProperty) {
    if (filedValue) {
      fieldElement[valueProperty || 'textContent'] = filedValue;
    } else {
      fieldElement.remove();
    }
  }

  function createCard(advert) {
    var cardElement = cardTemplate.cloneNode(true);

    var tempFieldValue = advert.offer.price !== undefined && advert.offer.price + ' ₽<span>/ночь</span>';
    renderField(cardElement.querySelector('.popup__text--price'), tempFieldValue, 'innerHTML');

    tempFieldValue = advert.offer.rooms !== undefined && advert.offer.guests !== undefined && advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
    renderField(cardElement.querySelector('.popup__text--capacity'), tempFieldValue);

    tempFieldValue = advert.offer.checkin && advert.offer.checkout && 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    renderField(cardElement.querySelector('.popup__text--time'), tempFieldValue);

    renderField(cardElement.querySelector('.popup__title'), advert.offer.title);
    renderField(cardElement.querySelector('.popup__text--address'), advert.offer.address);
    renderField(cardElement.querySelector('.popup__type'), window.data.getTitle(advert.offer.type));
    renderField(cardElement.querySelector('.popup__description'), advert.offer.description);
    renderField(cardElement.querySelector('.popup__avatar'), advert.author && advert.author.avatar, 'src');
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
    if (!map) {
      return;
    }
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
