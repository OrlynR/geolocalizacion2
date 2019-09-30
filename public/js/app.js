const socket = io();

let message_user= document.getElementById('message_user');
let user= document.getElementById('user');
let btn = document.getElementById('send');
let events = document.getElementById('events');
let messages = document.getElementById('messages');

btn.addEventListener('click',function() {
    //onsole.log(user.value + '' + message_user.value);

    // recibimos el msj del cliente
    socket.emit('message',{
        user:user.value,
        message_user: message_user.value
    });
});

message_user.addEventListener('keypress',function() {
    socket.emit('typing',user.value);
});

// recibir la data e imprimirla en message
socket.on('message',function(data){
    
    messages.innerHTML += `<p>
    <strong>${data.user}</strong>
    ${data.message_user}
    </p>`;
    message_user.value='';
    events.innerHtml='';
})


socket.on('typing',function(data){
    events.innerHTML = `<p><em>${data} is typing</em></p>`;
});

$(document).ready(function () {
    //Click al boton para pedir permisos
    $("#send").click(function () {
        //Si el navegador soporta geolocalizacion
        if (!!navigator.geolocation) {
            //Pedimos los datos de geolocalizacion al navegador
            navigator.geolocation.getCurrentPosition(
                    //Si el navegador entrega los datos de geolocalizacion los imprimimos
                    function (position) {
                        // window.alert("nav permitido");
                        $("#nlat").text('Latitud: ' + position.coords.latitude);
                        $("#nlon").text('Longitud: ' + position.coords.longitude);
                    },
                    //Si no los entrega manda un alerta de error
                    function () {
                        window.alert("nav no permitido");
                    }
            );
        }
    });
});
let date= new Date();
document.getElementById("demo").innerHTML = date;
