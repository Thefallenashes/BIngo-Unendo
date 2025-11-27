let numeros = [];
const bolas1 = new Map();
const bolas2 = new Map();

// Crear los 90 círculos (45 por tablero)
function crearTableros() {
    const t1 = document.getElementById("tablero1");
    const t2 = document.getElementById("tablero2");

    t1.innerHTML = "";
    t2.innerHTML = "";

    for (let i = 0; i < 45; i++) {
        // Tablero 1
        const b1 = document.createElement("div");
        b1.className = "bola";
        b1.id = `b1-${i}`;
        t1.appendChild(b1);

        // Tablero 2
        const b2 = document.createElement("div");
        b2.className = "bola";
        b2.id = `b2-${i}`;
        t2.appendChild(b2);
    }
}

crearTableros();

// Extraer un número
function addNumeroBingo() {
    if (numeros.length >= 90) {
        showAlert("Ya han salido todos los números");
        return;
    }

    let valor = Math.floor(Math.random() * 90 + 1);

    while (numeros.includes(valor)) {
        valor = Math.floor(Math.random() * 90 + 1);
    }

    numeros.push(valor);
    document.getElementById("numeroMostrado").innerText = valor;

    let pos = numeros.length - 1;

    if (pos < 45) {
        bolas1.set(pos, valor);
        document.getElementById(`b1-${pos}`).innerText = valor;
    } else {
        let pos2 = pos - 45;
        bolas2.set(pos2, valor);
        document.getElementById(`b2-${pos2}`).innerText = valor;
    }
}

// Comprobar bingo
function comprobarBingo() {
    const texto = document.getElementById("bingoComprobar").value.trim();

    if (texto === "") {
        showAlert("Introduce números separados por comas");
        return;
    }

    const entradas = texto.split(",");
    const numsInput = [];

    for (let p of entradas) {
        const n = Number(p.trim());
        if (isNaN(n) || n < 1 || n > 90) {
            showAlert("Formato incorrecto: solo números entre 1 y 90 separados por comas");
            return;
        }
        numsInput.push(n);
    }

    const todos = [...bolas1.values(), ...bolas2.values()];

    for (let n of numsInput) {
        if (!todos.includes(n)) {
            showAlert("Número no encontrado: " + n);
            return;
        }
    }

    // Aquí estaba el error: else if sin condición
    if (numsInput.length === 15) {
        showAlert("¡Bingo válido!");
    } else if (numsInput.length < 15) {
        showAlert("Faltan números para Bingo (deben ser 15)");
    } else {
        showAlert("Demasiados números para Bingo (deben ser 15)");
    }
}

// Comprobar línea
function comprobarLinea() {
    const texto = document.getElementById("lineaComprobar").value.trim();

    if (texto === "") {
        showAlert("Introduce números separados por comas");
        return;
    }

    const entradas = texto.split(",");
    const numsInput = [];

    for (let p of entradas) {
        const n = Number(p.trim());
        if (isNaN(n) || n < 1 || n > 90) {
            showAlert("Formato incorrecto: solo números entre 1 y 90 separados por comas");
            return;
        }
        numsInput.push(n);
    }

    const todos = [...bolas1.values(), ...bolas2.values()];

    for (let n of numsInput) {
        if (!todos.includes(n)) {
            showAlert("Número no encontrado: " + n);
            return;
        }
    }

    // Validación de cantidad de números
    if (numsInput.length === 5) {
        showAlert("¡Línea válida!");
    } else if (numsInput.length < 5) {
        showAlert("Faltan números para Línea (deben ser 5)");
    } else {
        showAlert("Demasiados números para Línea (deben ser 5)");
    }
}
// Reiniciar todo
function reiniciar() {
    numeros = [];
    bolas1.clear();
    bolas2.clear();
    document.getElementById("numeroMostrado").innerText = "";
    document.getElementById("lineaComprobar").value = "";
    document.getElementById("bingoComprobar").value = "";
    crearTableros();
}

// Eventos
document.getElementById("botonGenerar").addEventListener("click", addNumeroBingo);
document.getElementById("botonComprobar").addEventListener("click", comprobarBingo);
document.getElementById("botonComprobarlinea").addEventListener("click", comprobarLinea);
document.getElementById("botonReiniciarBingo").addEventListener("click", reiniciar);

// Alert personalizado
/*
function showAlert(mensaje) {
    document.getElementById("alertMessage").textContent = mensaje;
    document.getElementById("customAlert").style.display = "block";
    document.getElementById("customAlert").style.backgroundColor = "green";
    document.getElementById("overlay").style.display = "block";
    document.getElementById("closeAlertButton").onclick = closeAlert;
     setTimeout(() => {
        document.getElementById("customAlert").style.display = "none";
        document.getElementById("overlay").style.display = "none";
    }, 5000);
}
*/

