const colores = {
    negro: { valor: 0, multiplicador: 1, color: "black" },
    marron: { valor: 1, multiplicador: 10, tolerancia: "±1%", color: "#8B4513" },
    rojo: { valor: 2, multiplicador: 100, tolerancia: "±2%", color: "red" },
    naranja: { valor: 3, multiplicador: 1000, color: "orange" },
    amarillo: { valor: 4, multiplicador: 10000, color: "yellow" },
    verde: { valor: 5, multiplicador: 100000, tolerancia: "±0.5%", color: "green" },
    azul: { valor: 6, multiplicador: 1000000, tolerancia: "±0.25%", color: "blue" },
    violeta: { valor: 7, multiplicador: 10000000, tolerancia: "±0.1%", color: "violet" },
    gris: { valor: 8, multiplicador: 100000000, tolerancia: "±0.05%", color: "gray" },
    blanco: { valor: 9, multiplicador: 1000000000, color: "white" },
    dorado: { multiplicador: 0.1, tolerancia: "±5%", color: "gold" },
    plateado: { multiplicador: 0.01, tolerancia: "±10%", color: "silver" }
};

const listaColores = Object.keys(colores);

function crearSelect(id) {
    let select = `<select id="${id}" onchange="actualizarColor('${id}')">`;
    listaColores.forEach(color => {
        select += `<option value="${color}">${color}</option>`;
    });
    select += "</select>";
    return select;
}

function generarSelectores() {
    let tipo = document.getElementById("tipo").value;
    let div = document.getElementById("selectors");
    div.innerHTML = "";

    let cantidad = tipo == 4 ? 4 : 5;

    for (let i = 1; i <= cantidad; i++) {
        div.innerHTML += `<label>Banda ${i}</label>`;
        div.innerHTML += crearSelect("banda" + i);
        div.innerHTML += "<br>";
    }

    actualizarBandasVisibles(cantidad);
}

function actualizarBandasVisibles(cantidad) {
    for (let i = 1; i <= 5; i++) {
        let banda = document.getElementById("band" + i);
        banda.style.display = i <= cantidad ? "block" : "none";
    }
}

function actualizarColor(selectId) {
    let numero = selectId.replace("banda", "");
    let colorSeleccionado = document.getElementById(selectId).value;
    document.getElementById("band" + numero).style.backgroundColor =
        colores[colorSeleccionado].color;
}

function calcular() {
    let tipo = document.getElementById("tipo").value;
    let valor = "";
    let multiplicador;
    let tolerancia = "";

    if (tipo == 4) {
        let b1 = colores[banda1.value];
        let b2 = colores[banda2.value];
        let b3 = colores[banda3.value];
        let b4 = colores[banda4.value];

        valor = parseInt("" + b1.valor + b2.valor);
        multiplicador = b3.multiplicador;
        tolerancia = b4.tolerancia || "Sin tolerancia";
    } else {
        let b1 = colores[banda1.value];
        let b2 = colores[banda2.value];
        let b3 = colores[banda3.value];
        let b4 = colores[banda4.value];
        let b5 = colores[banda5.value];

        valor = parseInt("" + b1.valor + b2.valor + b3.valor);
        multiplicador = b4.multiplicador;
        tolerancia = b5.tolerancia || "Sin tolerancia";
    }

    let resultadoFinal = valor * multiplicador;

    let display = `Valor: ${resultadoFinal} Ω <br> Tolerancia: ${tolerancia}`;

    if (tolerancia !== "Sin tolerancia") {
        let tolPercent = parseFloat(tolerancia.replace("±", "").replace("%", ""));
        let min = resultadoFinal * (1 - tolPercent / 100);
        let max = resultadoFinal * (1 + tolPercent / 100);
        display += `<br> Rango: ${min} Ω - ${max} Ω`;
    }

    document.getElementById("resultado").innerHTML = display;
}

function resetear() {
    document.getElementById("tipo").value = "4";
    generarSelectores();
    document.getElementById("resultado").innerHTML = "";
}

document.getElementById("tipo").addEventListener("change", generarSelectores);

generarSelectores();