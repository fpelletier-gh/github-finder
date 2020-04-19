export const fetchApi = function (url, callback, config) {
  fetch(url, config)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then(function (data) {
      return callback(data, null);
    })
    .catch(function (err) {
      callback({}, true);
      console.warn("Something went wrong.", err);
    });
};

export const domReady = function (funct) {
  document.addEventListener(
    "DOMContentLoaded",
    function () {
      if (typeof funct === "function") {
        funct();
      }
    },
    false
  );
};

export const $$ = function (selector, parent) {
  return Array.prototype.slice.call(
    (parent ? parent : document).querySelectorAll(selector)
  );
};

export const $ = function (selector, parent) {
  return (parent ? parent : document).querySelector(selector);
};
