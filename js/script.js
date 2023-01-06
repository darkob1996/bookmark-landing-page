"use strict";

class App {
  _allTabs = document.querySelectorAll(".features__tab");
  _allFeatures = document.querySelectorAll(".feature");
  _tabsContainer = document.querySelector(".features__tabs");
  _questionContainer = document.querySelector(".question__container");
  _allAnswers = document.querySelectorAll(".question__answer");
  _targetIcon;
  _targetQuestion;
  _targetAnswer;
  _menuOpen = document.querySelector(".header__nav--menu-open");
  _menuClose = document.querySelector(".menu__header--close");
  _menu = document.querySelector(".menu");

  constructor() {
    this._setDataAttributes();
    [this._changeFeature, this._changeTab].forEach((f) =>
      this._tabsContainer.addEventListener("click", f.bind(this))
    );
    this._questionContainer.addEventListener(
      "click",
      this._openAnswer.bind(this)
    );
    this._menuOpen.addEventListener("click", this._openMenu.bind(this));
    this._menuClose.addEventListener("click", this._closeMenu.bind(this));
  }

  _setDataAttributes() {
    this._allTabs.forEach((tab, i) => tab.setAttribute("data-tab", `${i + 1}`));
  }

  _changeFeature(e) {
    const curTab = e.target.closest(".features__tab");
    const goToTab = +curTab.dataset.tab;

    this._allFeatures.forEach((feature) => feature.classList.add("hidden"));
    document.querySelector(`.feature--${goToTab}`).classList.remove("hidden");
  }

  _changeTab(e) {
    const curTab = e.target.closest(".features__tab");

    this._allTabs.forEach((tab) =>
      tab.classList.remove("features__tab--active")
    );

    curTab.classList.add("features__tab--active");
  }

  _toggleAnswer(imgUrl, deg) {
    this._targetIcon.src = `http://127.0.0.1:5506/images/${imgUrl}.svg`;
    this._targetIcon.style.transform = `rotate(${deg})`;
    this._targetAnswer.classList.toggle("hidden");
  }

  _openAnswer(e) {
    this._targetQuestion = e.target.closest(".question");
    if (!this._targetQuestion) return;

    this._targetIcon = this._targetQuestion.querySelector(".icon-arrow");
    this._targetAnswer = document.querySelector(
      `.question__answer--${+this._targetQuestion.classList[1].slice(-1)}`
    );

    this._targetIcon.src === "http://127.0.0.1:5506/images/icon-arrow.svg"
      ? this._toggleAnswer("icon-arrow-red", "180deg")
      : this._toggleAnswer("icon-arrow", "0");
  }

  _openMenu(e) {
    e.preventDefault();
    this._menu.classList.remove("hidden");
  }

  _closeMenu(e) {
    e.preventDefault();
    this._menu.classList.add("hidden");
  }
}

const app = new App();
