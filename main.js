var buttonReset = document.getElementById("reset");
var input = document.getElementById("dataInput");

buttonReset.addEventListener("click", () => {
  input.value = "";
})

input.addEventListener("input", function () {
  let valor = input.value;
  let formattedValue = formatarData(valor);
  input.value = formattedValue;
});

function formatarData(valor) {
  valor = valor.replace(/\D/g, ""); // Remove todos os caracteres não numéricos

  let dia = valor.substring(6, 8);
  let mes = valor.substring(4, 6);
  let ano = valor.substring(0, 4);

  if (valor.length > 7) {
    // Limita o comprimento do valor
    valor = valor.substring(0, 8);
  }

  if (valor.length > 4) {
    valor = [ano, mes, dia].join("/");
  } else if (valor.length > 0) {
    valor = [ano, mes].join("/");
  }

  return valor;
}


const url = 'https://api.nasa.gov/planetary/apod'

fetch(url)
.then((response) => response.json())
.then((data) => console.log(data))