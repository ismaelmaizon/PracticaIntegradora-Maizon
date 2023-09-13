


// lado del front

import passport from "passport";
import { rolesMiddlewareUser } from "../../router/middlewares/roles.middlewares";

const socket = io();
let user;

const produ = [
    {
        "pr": 1
    }
]

const chatbox = document.getElementById('chatbox')
const messageLogs = document.getElementById('messageLogs')


Swal.fire({
    title: 'ingrese su correo electronico',
    input: 'text',
    inputValidator: (value) => {
        return !value && 'necesitas escribir tu nombre'
    },
    allowOutsideClick: false
}).then((result) => { 
    user = result.value;
    socket.emit('authenticatedUser', user)
})

// tomando la info enviada por el usuario
chatbox.addEventListener('keyup', (evt) => {
    if (evt.key === 'Enter') {
        socket.emit('message', { 
            user: user , 
            message: chatbox.value
        })
        chatbox.value = '';
    }
} );


// para imprimrir lo que escriben
socket.on('imprimir',passport.authenticate('jwt', {session: false}), rolesMiddlewareUser, async (data) =>{
    console.log(data);
    let mensajes = '';
    data.forEach( (msj) => {
        mensajes += `${msj.user} escribio: ${msj.message}  <br/>`
    } )
    messageLogs.innerHTML = mensajes
})


// aviso de ingreso nuevo
socket.on('ingreso',passport.authenticate('jwt', {session: false}), rolesMiddlewareUser, (data) => {
    if (!user) return
    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000,
        title: data + ' se a unido al chat',
        icon: 'success'
    })
    // alert('ingreso! : ' + data)
})
