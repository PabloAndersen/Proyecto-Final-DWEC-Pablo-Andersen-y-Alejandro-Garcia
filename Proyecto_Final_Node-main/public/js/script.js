function validarRol() {
    let rol = $("#rol").value;
    rol=rol.toLowerCase();
    console.log(rol);
    if(rol==""){
        estaCorrecto = "Rol no valido";
    }else if (rol.toLowerCase()=="rio" || rol.toLowerCase()=="lago" || rol.toLowerCase()=="socio" || rol.toLowerCase()=="playa"){
        estaCorrecto = "Rol valido";
    }else{
        estaCorrecto= "Rol no valido";
    }
    return estaCorrecto;
}
function validarContraseña() {
    let conUsuario = $("#conUsuario").value;
    let estaCorrecto = true;
    if (conUsuario == "") {
        estaCorrecto = "Contraseña no valida";
    }
    return estaCorrecto;
}
$("#btn").addEventListener("click", function () {
    var rolValidado = validarRol();
    var conValidada = validarContraseña();
    console.log(rolValidado);
    if (rolValidado == "Rol no valido") {
        var mensaje = document.querySelector("#mensaje");
        mensaje.innerText = rolValidado;
        mensaje.classList.add("aparece");
        setInterval((e) => {
            mensaje.classList.remove("aparece");
            mensaje.classList.add("desaparece");
        }, 3000);
    } else if (conValidada == "Contraseña no valida") {
        var mensaje = document.querySelector("#mensaje");
        mensaje.innerText = conValidada;
        mensaje.classList.add("aparece");
        setInterval((e) => {
            mensaje.classList.remove("aparece");
            mensaje.classList.add("desaparece");
        }, 3000);
    } else {
        window.location.href = "/inicioSesion"
    }

});
function $(selector) {
    return document.querySelector(selector);
}