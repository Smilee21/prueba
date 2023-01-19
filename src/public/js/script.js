const elementosForm = document.getElementById("formData");

elementosForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let fecha = new Date();
    let nombre = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;
    let mensaje = document.getElementById("mensaje").value;
    let elementosForm = { fecha: fecha, nombre: nombre, email: email, mensaje: mensaje}
    let elementosFormJSON = JSON.stringify(elementosForm);

    console.log(elementosFormJSON);
    alert("sus datos se han enviado")
    
    //Guardar en el servidor
    fetch(`/contact`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: elementosFormJSON,

    });


})
