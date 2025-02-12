const html_sidebarWrapper = document.querySelector(".sidebar-wrapper");

let Navigation = {
  load: false,
  init: function () {
    fetch("/src/assets/data/sidebar.html")
      .then((res) => res.text())
      .then(function (text) {
        html_sidebarWrapper.innerHTML = text;
        Navigation.openCurrentFolder();
      });

    let cssRuleid1 = CSS.addRule((s) => {
      return `.navbar a[href="${s}"]{font-weight: bold;color:cornflowerblue;}`;
    }, document.location.pathname);
    let cssRuleid2 = CSS.addRule((s) => {
      return `.navbar[data-navbar="${s}"]{width:100%;height:auto;}`;
    }, "devlog");
    let cssRuleid3 = CSS.addRule((s) => {
      return `.navbar-title[data-navbar="${s}"]{color:#666;font-weight: bold;}`;
    }, "devlog");

    document.addEventListener("click", function (event) {
      let ele = event.target;
      if (ele.classList.contains("navbar-folder")) {
        ele.nextElementSibling.classList.toggle("navbar-folder-open");
      } else if (ele.classList.contains("navbar-title")) {
        CSS.setState(cssRuleid2, ele.dataset.navbar);
        CSS.setState(cssRuleid3, ele.dataset.navbar);
      } else if (ele.classList.contains("navbar-folder-opener")) {
        Navigation.openCurrentFolder();
        html_sidebarWrapper.querySelector("#sidebar_button").checked = true;
      }
    });
    URL.addEvent(function () {
      CSS.setState(cssRuleid1, document.location.pathname);
      html_sidebarWrapper.querySelector("#sidebar_button").checked = false;
    });
  },
  openCurrentFolder: function () {
    const html_navbarWrapper =
      html_sidebarWrapper.querySelector(`.nav-navbar-wrapper`);
    if (html_navbarWrapper == null) return;
    // 모든 폴더 닫기
    html_navbarWrapper
      .querySelectorAll(".navbar-folder-open")
      .forEach((e) => e.classList.remove("navbar-folder-open"));
    //폴더 열기
    const postLink = html_navbarWrapper.querySelector(
      `.navbar a[href="${document.location.pathname}"`
    );
    if (postLink == null) return;
    let folder = postLink.parentElement.parentElement; //<div is folder><ol><li><a is postlink>
    while (!folder.classList.contains("navbar")) {
      folder.classList.add("navbar-folder-open");
      folder = folder.parentElement;
    }
    //탭 열기
    html_sidebarWrapper
      .querySelector(`.navbar-title[data-navbar="${folder.dataset["navbar"]}"]`)
      .click();
  },
  toggleRotate: function (event) {
    if (!event.target.classList.contains("post-link")) {
      const html_profile = document.querySelector(".sidebar>.profile");
      html_profile.classList.toggle("rotate");
    }
  },
};

Navigation.init();
