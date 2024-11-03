let $cartas = [];
let $cartasGiradas = [];
let partidas = 0;
let intentos = 0;
let temporizador = 0;
let intervalo;

const $tablero = document.getElementById("tablero");
const $mostrarIntentos = document.getElementById("intentos");
const $mostrarTemporizador = document.getElementById("temporizador");

function empezarJuego() {
    $cartas = []; 
    intentos = 0;
    temporizador = 0;
    partidas = 0;
    $mostrarIntentos.textContent = intentos;
    $mostrarTemporizador.textContent = temporizador;

    clearInterval(intervalo);
    intervalo = setInterval(() => {
        temporizador = temporizador + 1;
        $mostrarTemporizador.textContent = temporizador;
    }, 1000);

    for (let i = 1; i <= 8; i = i + 1) {
        $cartas.push(i);
        $cartas.push(i);
    }
    mezclar($cartas);

    $tablero.innerHTML = "";
    $cartas.forEach((value) => {
        const $carta = document.createElement("div");
        $carta.classList.add("carta");
        $carta.dataset.value = value;
        $carta.addEventListener("click", girarCarta);
        $tablero.appendChild($carta);
    });
}

function mezclar(arrayCartas) {
    for (let i = arrayCartas.length - 1; i > 0; i = i - 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrayCartas[i], arrayCartas[j]] = [arrayCartas[j], arrayCartas[i]];
    }
}

function girarCarta(event) {
    const carta = event.target;
    if (carta.classList.contains("girada") || $cartasGiradas.length === 2) return;

    carta.classList.add("girada");
    carta.textContent = carta.dataset.value;
    $cartasGiradas.push(carta);

    if ($cartasGiradas.length === 2) {
        intentos = intentos + 1;
        $mostrarIntentos.textContent = intentos;

        if ($cartasGiradas[0].dataset.value === $cartasGiradas[1].dataset.value) {
            $cartasGiradas = [];
            partidas = partidas + 1;
            if (partidas === $cartas.length / 2) {
                clearInterval(intervalo);
                alert(`¡Ganaste! Tiempo total: ${temporizador} segundos, Intentos: ${intentos}`);
            }
        } else {
            setTimeout(() => {
                $cartasGiradas.forEach((carta) => {
                    carta.classList.remove("girada");
                    carta.textContent = "";
                });
                $cartasGiradas = [];
            }, 1000);
        }
    }
}

empezarJuego();
