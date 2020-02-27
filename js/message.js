'use strict';

(function () {
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  function showSuccess() {
    var messageElement = successTemplate.cloneNode(true);

    function closeMessage() {
      messageElement.remove();
      document.removeEventListener('keydown', onMessageEscPress);
      document.removeEventListener('click', onWindowClick);
    }

    function onMessageEscPress(evt) {
      if (evt.key === window.utils.Const.ESC_KEY) {
        closeMessage();
      }
    }

    function onWindowClick() {
      closeMessage();
    }

    document.addEventListener('keydown', onMessageEscPress);
    document.addEventListener('click', onWindowClick);

    main.insertAdjacentElement('afterbegin', messageElement);
  }

  function showTransferError(message) {
    var messageElement = errorTemplate.cloneNode(true);
    var button = messageElement.querySelector('.error__button');

    function closeMessage() {
      messageElement.remove();
      document.removeEventListener('keydown', onMessageEscPress);
      document.removeEventListener('click', onWindowClick);
    }

    function onMessageEscPress(evt) {
      if (evt.key === window.utils.Const.ESC_KEY) {
        closeMessage();
      }
    }

    function onWindowClick(evt) {
      if (messageElement.contains(evt.target)) {
        closeMessage();
      }
    }

    button.addEventListener('click', function () {
      closeMessage();
    });
    messageElement.querySelector('.error__message').textContent = message;
    document.addEventListener('keydown', onMessageEscPress);
    document.addEventListener('click', onWindowClick);

    main.insertAdjacentElement('afterbegin', messageElement);
    button.focus();
  }

  window.message = {
    showTransferError: showTransferError,
    showSuccess: showSuccess
  };
})();
