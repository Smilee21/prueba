const elementosForm = document.getElementById("formData");

elementosForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  let fecha = new Date();
  let nombre = document.getElementById("nombre").value;
  let email = document.getElementById("email").value;
  let mensaje = document.getElementById("mensaje").value;
  //otro fetch para obtener la ip del usuario
  alert("SUS DATOS SE ESTAN ENVIANDO");
  const respuesta = await fetch("https://api.ipify.org?format=json").then(
    (res) => res.json()
  );
  let ipReal = respuesta.ip;
  //fetch para obtener el pais
  const p = await fetch(
    `http://ip-api.com/json/${ipReal}?fields=country`
  ).then((res) => res.json());
  let pais = p.country;
  let elementosForm = {
    fecha: fecha,
    nombre: nombre,
    email: email,
    mensaje: mensaje,
    ip: ipReal,
    pais: pais
  };
  let elementosFormJSON = JSON.stringify(elementosForm);
  console.log(elementosFormJSON);
  alert("LOS DATOS SE HAN ENVIADO CORRECTAMENTE");

  fetch(`/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: elementosFormJSON,
  });
});
