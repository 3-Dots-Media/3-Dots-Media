import $ from 'jquery';

export function initMap() {
    var myCenter = new google.maps.LatLng(47.155639, 27.585490);
    var mapProp = {
        center: myCenter,
        zoom: 15,
        scrollwheel: false,
        draggable: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    var map = new google.maps.Map(
        document.getElementById("googleMap"),
        mapProp
    );
    var marker = new google.maps.Marker({
        position: myCenter,
    });
    marker.setMap(map);
};

export function scroll() {
    $(document).on('click', 'a[href^="#"].scroll', function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 76
        }, 500);
    });
}

export function mobileCloseNavbar() {
    $(document).on('click', 'a[href^="#"].scroll', function (event) {
        if ($(window).width() < 768) {
            $('.navbar-collapse').collapse('toggle');
        }
    });
}

export function overlay() {
    $(document).ready(function () {
        $('#overlay').fadeIn();
    });

    setTimeout(function () {
        $('#overlay').fadeOut(200, "linear");
    }, 3000);
}