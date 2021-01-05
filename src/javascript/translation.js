import $ from "jquery";
import translations from "../javascript/resources";

let currentLanguage = 1;

const languages = {
  1: "ro",
  2: "en",
};

export function switchListener() {
  const switchBtn = document.querySelector(".switchBtn");
  const container = document.querySelector(".switch-container");
  const ro = document.querySelector(".ro");
  const en = document.querySelector(".en");

  switchBtn.addEventListener("click", () => {
    container.classList.toggle("on");
    currentLanguage = currentLanguage == 1 ? 2 : 1;
    changeTranslations();
  });

  ro.addEventListener("click", () => {
    if (switchBtn.checked) {
      switchBtn.checked = false;
      container.classList.toggle("on");
      currentLanguage = currentLanguage == 1 ? 2 : 1;
      changeTranslations();
    } else {
      return;
    }
  });

  en.addEventListener("click", () => {
    if (switchBtn.checked) {
      return;
    } else {
      switchBtn.checked = true;
      container.classList.toggle("on");
      currentLanguage = currentLanguage == 1 ? 2 : 1;
      changeTranslations();
    }
  });
}

export function setLanguageIcon() {
  $(".nav-item-with-flag").each(function () {
    if (this.dataset.value == currentLanguage) {
      $(this).addClass("selected");
    } else {
      $(this).removeClass("selected");
    }
  });
}

export function changeLanguage() {
  $(document).on("click", ".nav-item-with-flag", function (event) {
    let element = event.target;
    if (element.dataset.value != currentLanguage) {
      currentLanguage = currentLanguage == 1 ? 2 : 1;
      setLanguageIcon();
    }
  });
}

export function getTranslation(value) {
  let translation;
  try {
    translation = translations[value][currentLanguage];
  } catch (err) {
    translation = value;
    console.warn(value + " was not found in translations!");
  }
  return translation;
}

export function changeTranslations() {
  $(document).ready(function () {
    $("#overlay").fadeIn();
  });
  setTimeout(function () {
    $("[data-translate]").each(function () {
      var translation = this.dataset.translate;
      if (
        this.nodeName.toLowerCase() == "input" ||
        this.nodeName.toLowerCase() == "textarea"
      ) {
        $(this).attr("placeholder", getTranslation(translation));
      } else {
        $(this).text(getTranslation(translation));
      }
    });
  }, 1000);
  setTimeout(function () {
    $("#overlay").fadeOut(200, "linear");
  }, 1500);
}
