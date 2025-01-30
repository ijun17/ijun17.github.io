let URL = {
  eventList: [],
  onurlchange: function () {
    for (let f of URL.eventList) f();
  },
  addEvent: function (f) {
    URL.eventList.push(f);
  },
  set: function (url) {
    if (url === document.location.href) return;
    history.pushState(null, null, url);
    URL.onurlchange();
  },
  init: function () {
    window.addEventListener("popstate", URL.onurlchange);
  },
};

URL.init();

let CSS = {
  sheet: null,
  rules: [],
  setState: function (id, state) {
    if (CSS.rules.length > id) {
      CSS.sheet.insertRule(CSS.rules[id](state), id);
      CSS.sheet.deleteRule(id + 1);
    }
  },
  addRule: function (f, state) {
    CSS.sheet.insertRule(f(state), CSS.rules.length);
    CSS.rules.push(f);
    return CSS.rules.length - 1;
  },
  init: function () {
    CSS.sheet = document.head.appendChild(
      document.createElement("style")
    ).sheet;
  },
};

CSS.init();
