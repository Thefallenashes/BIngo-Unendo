
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
        alert("Ya han salido todos los números");
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


// Comprobar bingo (versión simple)
function comprobarBingo() {
    const texto = document.getElementById("bingoComprobar").value.trim();

    if (texto === "") {
        alert("Introduce números separados por comas");
        return;
    }

    // obtener números del input
    const entradas = texto.split(",");
    const numsInput = [];

    for (let p of entradas) {
        const n = Number(p.trim());
        if (isNaN(n) || n < 1 || n > 90) {
            alert("Formato incorrecto: solo números entre 1 y 90 separados por comas");
            return;
        }
        numsInput.push(n);
    }

    // Lista de todos los números que han salido
    const todos = [...bolas1.values(), ...bolas2.values()];

    // Comprobar uno por uno
    for (let n of numsInput) {
        if (!todos.includes(n)) {
            abrirPopupNoBingo();
            return;
        }
    }

    abrirPopupBingo();
}
function comprobarLinea() {
    const texto = document.getElementById("lineaComprobar").value.trim();

    if (texto === "") {
        alert("Introduce números separados por comas");
        return;
    }

    // obtener números del input
    const entradas = texto.split(",");
    const numsInput = [];

    for (let p of entradas) {
        const n = Number(p.trim());
        if (isNaN(n) || n < 1 || n > 90) {
            alert("Formato incorrecto: solo números entre 1 y 90 separados por comas");
            return;
        }
        numsInput.push(n);
    }

    // Lista de todos los números que han salido
    const todos = [...bolas1.values(), ...bolas2.values()];

    // Comprobar uno por uno
    for (let n of numsInput) {
        if (!todos.includes(n)) {
            abrirPopupNoLinea();
            return;
        }
    }

    abrirPopupLinea();
}

// Reiniciar todo
function reiniciar() {
    numeros = [];
    bolas1.clear();
    bolas2.clear();
    document.getElementById("numeroMostrado").innerText = "";
    document.getElementById("lineaComprobar").value= "";
    document.getElementById("bingoComprobar").value= "";
    crearTableros();
}


// Eventos
document.getElementById("botonGenerar").addEventListener("click", addNumeroBingo);
document.getElementById("botonComprobar").addEventListener("click", comprobarBingo);
document.getElementById("botonComprobarlinea").addEventListener("click", comprobarLinea);
document.getElementById("botonReiniciarBingo").addEventListener("click", reiniciar);

//POP UPS

//Aviso de linea
// ABRIR popup
function abrirPopupLinea() {
    document.getElementById("linea").style.display = "flex";
}

// CERRAR popup
function cerrarPopupLinea() {
    document.getElementById("linea").style.display = "none";
}

    // Cerrar al clicar fuera
document.getElementById("linea").addEventListener("click", (e) => {
    if (e.target.id === "linea") cerrarPopupLinea();
});

//Aviso de NO linea
// ABRIR popup
function abrirPopupNoLinea() {
    document.getElementById("noLinea").style.display = "flex";
}

// CERRAR popup
function cerrarPopupNoLinea() {
    document.getElementById("noLinea").style.display = "none";
}

    // Cerrar al clicar fuera
document.getElementById("noLinea").addEventListener("click", (e) => {
    if (e.target.id === "noLinea") cerrarPopupNoLinea();
});

//Aviso de bingo
// ABRIR popup
function abrirPopupBingo() {
    document.getElementById("bingo").style.display = "flex";
}

// CERRAR popup
function cerrarPopupBingo() {
    document.getElementById("bingo").style.display = "none";
}

    // Cerrar al clicar fuera
document.getElementById("bingo").addEventListener("click", (e) => {
    if (e.target.id === "bingo") cerrarPopupBingo();
});

//Aviso de NO bingo
// ABRIR popup
function abrirPopupNoBingo() {
    document.getElementById("noBingo").style.display = "flex";
}

// CERRAR popup
function cerrarPopupNoBingo() {
    document.getElementById("noBingo").style.display = "none";
}

    // Cerrar al clicar fuera
document.getElementById("noBingo").addEventListener("click", (e) => {
    if (e.target.id === "noBingo") cerrarPopupNoBingo();
});





