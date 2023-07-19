var buttonReset = document.getElementById("reset");
var buttonSearch = document.getElementById("search");
var photo = document.getElementById("photo");
var load = document.getElementById("load");
var input = document.getElementById("dataInput");


buttonReset.addEventListener("click", () => {
  input.value = "";
})

input.addEventListener("input", function () {
  let valor = input.value;
  let formattedValue = formattedData(valor);
  input.value = formattedValue;

  if(valor.length >= 10) {
    buttonReset.classList.add('none')
    buttonSearch.classList.remove('none')
  }
});

function formattedData(valor) {
  valor = valor.replace(/\D/g, ""); // Remove todos os caracteres não numéricos

  let dia = valor.substring(6, 8);
  let mes = valor.substring(4, 6);
  let ano = valor.substring(0, 4);

  if (valor.length > 7) {
    // Limita o comprimento do valor
    valor = valor.substring(0, 8);
  }

  if (valor.length > 4) {
    valor = [ano, mes, dia].join("-");
  } else if (valor.length > 0) {
    valor = [ano, mes].join("-");
  }

  return valor;
}

const url = 'https://api.nasa.gov/planetary/apod?api_key=BD8WcweBfA4DYh8GerYXAAGpwXZccBSgmQUOruvM'

fetch(url)
.then((response) => response.json())
.then((data) => {
  photo.setAttribute('src', data.hdurl)
})

load.classList.add('none')

function searchPhoto() {
  photo.classList.add('none')
  load.classList.remove('none')

  fetch(`${url}&date=${input.value}`)
  .then((response) => response.json())
  .then((data) => {
    photo.setAttribute('src', data.hdurl)
  })
  .finally(() => {
    photo.classList.remove('none')
    load.classList.add('none')

    buttonReset.classList.remove('none')
    buttonSearch.classList.add('none')
  })
}