'use strict';

(function () {
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

  function debounce(cb, interval) {
    var lastTimeout = null;
    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, interval);
    };
  }

  function readFile(file, onLoadCb) {
    if (!file) {
      return;
    }
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      onLoadCb(reader.result);
    });
    reader.readAsDataURL(file);
  }

  window.utils = {
    Const: {
      ESC_KEY: 'Escape',
      ENTER_KEY: 'Enter',
      MAIN_MOUSE_BUTTON: 0
    },
    getRandomIntInclusive: getRandomIntInclusive,
    getRandomElement: getRandomElement,
    getRandomSubarray: getRandomSubarray,
    debounce: debounce,
    readFile: readFile
  };
})();
