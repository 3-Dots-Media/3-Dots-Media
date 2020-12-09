import $ from 'jquery';

let currentLanguage = 1;

export function switchListener() {
    const switchBtn = document.querySelector(".switchBtn");
    const container = document.querySelector(".switch-container");
    const ro = document.querySelector(".ro");
    const en = document.querySelector(".en");

    switchBtn.addEventListener("click", () => container.classList.toggle("on"));

    ro.addEventListener("click", () => {
        if (switchBtn.checked) {
            switchBtn.checked = false;
            container.classList.toggle("on");
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
        }
    });
}

export function setLanuageIcon() {
    $('.nav-item-with-flag').each(function () {
        if (this.dataset.value == currentLanguage) {
            $(this).addClass("selected");
        } else {
            $(this).removeClass("selected");
        };
    });
}

export function changeLanguage() {
    $(document).on('click', '.nav-item-with-flag', function (event) {
        let element = event.target;
        if (element.dataset.value != currentLanguage) {
            currentLanguage = currentLanguage == 1 ? 2 : 1;
            setLanuageIcon();
        }
    });
}

function getTranslation(value) {
    let translation;
    try {
        translation = tranlations[value][currentLanguage];
    }
    catch (err) {
        translation = value;
        console.warn(value + " was not found in translations!");
    }
    return translation;
}