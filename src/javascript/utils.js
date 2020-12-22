import $ from "jquery";

export function initMap() {
  if (document.getElementById("googleMap") == undefined) {
    return;
  }
  var myCenter = new google.maps.LatLng(47.155639, 27.58549);
  var mapProp = {
    center: myCenter,
    zoom: 15,
    scrollwheel: false,
    draggable: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };
  var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
  var marker = new google.maps.Marker({
    position: myCenter,
  });
  marker.setMap(map);
}

export function scroll() {
  $(document).on("click", 'a[href^="#"].scroll', function (event) {
    event.preventDefault();
    $("html, body").animate(
      {
        scrollTop: $($.attr(this, "href")).offset().top - 75,
      },
      500
    );
  });
}

export function mobileCloseNavbar() {
  $(document).on("click", 'a[href^="#"].scroll', function (event) {
    if ($(window).width() < 768) {
      $(".navbar-collapse").collapse("toggle");
    }
  });
}

export function overlay() {
  $(document).ready(function () {
    $("#overlay").fadeIn();
  });

  setTimeout(function () {
    $("#overlay").fadeOut(200, "linear");
  }, 1500);
}

var TxtRotate = function (el, toRotateRo, toRotateEn, period) {
  this.toRotateRo = toRotateRo;
  this.toRotateEn = toRotateEn;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  var currentLanguage = !document
    .querySelector(".switch-container")
    .classList.value.includes(" on")
    ? 1
    : 2;

  var i =
    this.loopNum %
    (currentLanguage == 1 ? this.toRotateRo.length : this.toRotateEn.length);
  var fullTxt = currentLanguage == 1 ? this.toRotateRo[i] : this.toRotateEn[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

export function companyText() {
  setTimeout(function () {
    var elements = document.getElementsByClassName("txt-rotate");
    for (var i = 0; i < elements.length; i++) {
      var toRotateRo = elements[i].getAttribute("data-rotateRo");
      var toRotateEn = elements[i].getAttribute("data-rotateEn");
      var period = elements[i].getAttribute("data-period");
      if (toRotateRo && toRotateEn) {
        new TxtRotate(
          elements[i],
          JSON.parse(toRotateRo),
          JSON.parse(toRotateEn),
          period
        );
      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
  }, 1500);
}

function getCurentFileName() {
  var pagePathName = window.location.pathname;
  return pagePathName.substring(pagePathName.lastIndexOf("/") + 1);
}

export function animateNavigation() {
  var $nav = $("#navbar");
  var $win = $(window);
  var winH = $win.height();
  if (getCurentFileName() == "") {
    $win
      .on("scroll", function () {
        if ($(this).scrollTop() > winH) {
          $nav.addClass("sticky");
          $("#services").css("margin-top", "75px");
        } else {
          $nav.removeClass("sticky");
          $("#services").css("margin-top", "0");
        }
      })
      .on("resize", function () {
        winH = $(this).height();
      });
  } else {
    $nav.addClass("fixed-top");
  }
}
