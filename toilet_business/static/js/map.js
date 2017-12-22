//Declare
var map; //Google Map Object
var taipei = new google.maps.LatLng(25.048069, 121.517101); //init position�GTaipei station

$(function() {
    initMap();
    markerPosition();
});

//init map ver00
function initMap(){
    //map setting
    var mapOptions = {
        center: {lat: 24.052181, lng: 121.088073}, //Start Center{lat:�g��, lng:�n��} (�`�N�g�n�ץ����n�O�ƭȡA���i��r��)
        zoom: 15
    };
    //initial map
    map = new google.maps.Map($("#map")[0], mapOptions);

    //geolocation current position
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position) {
            start = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
            setStartPoint(start);

            // test mark multiple location
            addMarker("25.056334,121.543894", "post office");  //�]latitude,longitude�^
            addMarker("25.055705,121.543832", "cafe");         //�]latitude,longitude�^
            addMarker("25.055191,121.545222", "park");         //�]latitude,longitude�^
        }, function errorCallback(error) {
            var errorTypes={
                0:"������]���~",
                1:"�ϥΪ̩ڵ����Ѧ�m��T",
                2:"�L�k���o��m��T",
                3:"��m�d�߹O��"
            };
            alert(errorTypes[error.code]);
        });
    }else{
        alert("�A���s�������䴩�a�z�w��");
        start = taipei;
        setStartPoint(start);
    }

}

//set start point
function setStartPoint(point) {
    map.setCenter(point);
    //Start Marker
    startMarker = new google.maps.Marker({
        icon : 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        position : point,
        title : "�z����m",
        map : map
    });
}

//add marker
function addMarker(data, title){ // data(latitude,longitude)
    var str = data.split(",");
    var L1 = str[0]; //latitude
    var L2 = str[1]; //longitude
    var myLatLng = {lat: parseFloat(L1), lng: parseFloat(L2)}; //{lat:latitude, lng:longitude}
    console.log(myLatLng);
    var marker = new google.maps.Marker({
        position : myLatLng,
        map : map,
        title : title
    });
    map.setCenter(myLatLng);
}

//Ajax
function markerPosition(){
    var data = {"first_name":"Toilet", "last_name":"Business"};

    $.ajax({
        type: 'POST',
        url: '/map/flaskajax',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(data),
        success: function(callback) {
            console.log('Hello ' + callback.first_name + ' ' + callback.last_name  + '!');
        },
        error: function() {
            console.log("error!");
        }
    });
}