import $ from 'jquery';

export function initMap() {
    var myCenter = new google.maps.LatLng(47.1567594, 27.5913326);
    var mapProp = {
        center: myCenter,
        zoom: 13,
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
            scrollTop: $($.attr(this, 'href')).offset().top - 75
        }, 500);
    });
}