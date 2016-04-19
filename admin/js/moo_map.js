/**
 * Created by Intents Coder on 4/14/2016.
 */

function moo_getLatLong()
{
    if(moo_merchantLat == "" || moo_merchantLng == "" ||moo_merchantLat == null || moo_merchantLng == null)
    {
        jQuery.get('https://maps.googleapis.com/maps/api/geocode/json?&address='+moo_merchantAddress,function (data) {
            if(data.results.length>0)
            {
                var location = data.results[0].geometry.location;
                initMap(location);
                jQuery('#Moo_Lat').val(location.lat);
                jQuery('#Moo_Lng').val(location.lng);
            }
        })
    }
    else
    {
        var Merchantlocation = {};
        Merchantlocation.lng = parseFloat(moo_merchantLng);
        Merchantlocation.lat = parseFloat(moo_merchantLat);
        initMap(Merchantlocation);
        jQuery('#Moo_Lat').val(Merchantlocation.lat);
        jQuery('#Moo_Lng').val(Merchantlocation.lng);
    }

}
function initMap(myLatLng) {

    var map = new google.maps.Map(document.getElementById('moo_map'), {
        zoom: 18,
        center: myLatLng
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        draggable:true,
    });
    google.maps.event.addListener(marker, 'drag', function() {
        updateMarkerPosition(marker.getPosition());
    });
}

function updateMarkerPosition(newPosition)
{
    jQuery('#Moo_Lat').val(newPosition.lat());
    jQuery('#Moo_Lng').val(newPosition.lng());
}

moo_getLatLong();