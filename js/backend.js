'use strict';

(function () {
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var URL_DOWNLOAD = 'https://js.dump.academy/keksobooking/data';
  var TIMEOUT_IN_MS = 5000;
  var OK_STATUS_CODE = 200;

  function getRequestObject(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.addEventListener('load', function () {
      if (xhr.status === OK_STATUS_CODE) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    return xhr;
  }

  function save(data, onLoad, onError) {
    var xhr = getRequestObject(onLoad, onError);
    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  }

  function load(onLoad, onError) {
    var xhr = getRequestObject(onLoad, onError);
    xhr.open('GET', URL_DOWNLOAD);
    xhr.send();
  }

  window.backend = {
    save: save,
    load: load
  };
})();
