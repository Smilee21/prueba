const elementosForm = document.getElementById("formData");

elementosForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  let fecha = new Date();
  let nombre = document.getElementById("nombre").value;
  let email = document.getElementById("email").value;
  let mensaje = document.getElementById("mensaje").value;
  let response = grecaptcha.getResponse();
  if(response.length == 0 ){
    alert ('POR FAVOR VERIFICA QUE NO ERES UN ROBOT')
  } else{

  //otro fetch para obtener la ip del usuario
  alert("SUS DATOS SE ESTAN ENVIANDO");
  const respuesta = await fetch("https://api.ipify.org?format=json").then(
    (res) => res.json()
  );
  let ipReal = respuesta.ip;
  //fetch para obtener el pais
  const p = await fetch(
    `https://api.ipbase.com/v2/info?ip=${ipReal}&apikey=xBfcfe5wzSeNHhqSd3pvmCGiiuu10baE9bTasG2a`
  ).then((res) => (res.json()));
  let pais = p.data.location.country.name;
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
  }
});
