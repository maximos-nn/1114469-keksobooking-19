'use strict';

(function () {
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  function showSuccessMessage() {
    var messageElement = successTemplate.cloneNode(true);

    function closeMessage() {
      messageElement.remove();
      document.removeEventListener('keydown', onMessageEscPress);
    }

    function onMessageEscPress(evt) {
      if (evt.key === window.utils.const.ESC_KEY) {
        closeMessage();
      }
    }

    function onWindowClick() {
      closeMessage();
      document.removeEventListener('click', onWindowClick);
    }

    main.insertAdjacentElement('afterbegin', messageElement);
    document.addEventListener('keydown', onMessageEscPress);
    document.addEventListener('click', onWindowClick);
  }

  function showTransferError(message) {
    var messageElement = errorTemplate.cloneNode(true);
    var button = messageElement.querySelector('.error__button');

    function closeMessage() {
      messageElement.remove();
      document.removeEventListener('keydown', onMessageEscPress);
    }

    function onMessageEscPress(evt) {
      if (evt.key === window.utils.const.ESC_KEY) {
        closeMessage();
      }
    }

    function onWindowClick() {
      closeMessage();
      document.removeEventListener('click', onWindowClick);
    }

    button.addEventListener('click', function () {
      closeMessage();
    });
    messageElement.querySelector('.error__message').textContent = message;
    main.insertAdjacentElement('afterbegin', messageElement);
    document.addEventListener('keydown', onMessageEscPress);
    document.addEventListener('click', onWindowClick);
  }

  window.message = {
    showTransferError: showTransferError,
    showSuccessMessage: showSuccessMessage
  };
})();
