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