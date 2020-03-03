'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var map;
  var closeSubscriber;

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

  function renderField(fieldElement, filedValue) {
    if (filedValue) {
      fieldElement['textContent'] = filedValue;
    } else {
      fieldElement.remove();
    }
  }

  function create(advert) {
    var card = cardTemplate.cloneNode(true);

    var tempFieldValue = advert.offer.price !== undefined && advert.offer.price + ' ₽/ночь';
    renderField(card.querySelector('.popup__text--price'), tempFieldValue);

    tempFieldValue = advert.offer.rooms !== undefined && advert.offer.guests !== undefined && advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
    renderField(card.querySelector('.popup__text--capacity'), tempFieldValue);

    tempFieldValue = advert.offer.checkin && advert.offer.checkout && 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    renderField(card.querySelector('.popup__text--time'), tempFieldValue);

    renderField(card.querySelector('.popup__title'), advert.offer.title);
    renderField(card.querySelector('.popup__text--address'), advert.offer.address);
    renderField(card.querySelector('.popup__type'), window.data.getHousingTitle(advert.offer.type));
    renderField(card.querySelector('.popup__description'), advert.offer.description);
    renderFeatures(card.querySelector('.popup__features'), advert.offer.features);
    renderPhotos(card.querySelector('.popup__photos'), advert.offer.photos);

    if (advert.author && advert.author.avatar) {
      card.querySelector('.popup__avatar').src = advert.author.avatar;
    }

    card.querySelector('.popup__close').addEventListener('click', function () {
      handleCloseEvent();
    });
    return card;
  }

  function onCardEscPress(evt) {
    if (evt.key === window.utils.Const.ESC_KEY) {
      handleCloseEvent();
    }
  }

  function handleCloseEvent() {
    close();
    if (typeof closeSubscriber === 'function') {
      closeSubscriber();
    }
  }

  function close() {
    if (!map) {
      return;
    }
    var card = map.querySelector('.map__card');
    if (card) {
      card.remove();
      document.removeEventListener('keydown', onCardEscPress);
    }
  }

  function show(container, advert, onCloseCb) {
    map = container;
    closeSubscriber = onCloseCb;
    close();
    map.insertBefore(create(advert), map.querySelector('.map__filters-container'));
    document.addEventListener('keydown', onCardEscPress);
  }

  window.card = {
    show: show,
    close: close
  };
})();
