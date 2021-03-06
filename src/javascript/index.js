import "../sass/_main.scss";
import "../sass/navbar.scss";
import "../sass/buttons.scss";
import "../sass/inputs.scss";
import "../sass/project.scss";
import "../sass/style.scss";

import "jquery";
import "popper.js";
import "bootstrap";

import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";

import {
  initMap,
  scroll,
  mobileCloseNavbar,
  overlay,
  companyText,
  animateNavigation,
  sendEmail,
} from "./utils.js";
import { getCategories, getProjects } from "./api.js";
import {
  switchListener,
  setLanguageIcon,
  changeLanguage,
  changeTranslations,
} from "./translation.js";

window.onload = function () {
  initMap();
  scroll();
  mobileCloseNavbar();
  overlay();
  companyText();
  animateNavigation();
  getCategories();
  getProjects();
  switchListener();
  setLanguageIcon();
  changeLanguage();
  changeTranslations();
  sendEmail();
};
