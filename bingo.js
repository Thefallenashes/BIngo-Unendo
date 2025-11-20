let bingoInterval;
        let generatedNumbers = new Set();

        function startBingo() {
                let number;
                do {
                    number = Math.floor(Math.random() * 99) + 1;
                } while (generatedNumbers.has(number)); // Evitar números repetidos

                generatedNumbers.add(number);
                document.getElementById("ball").textContent = number;
                markGridCell(number);
                speakNumber(number);
            }
        

        function stopBingo() {
            clearInterval(bingoInterval);
            bingoInterval = null;
        }

        function resetGame() {
            generatedNumbers.clear();
            document.getElementById("ball").textContent = "--";
            const cells = document.querySelectorAll(".grid-cell");
            cells.forEach(cell => {
                cell.classList.remove("marked");
                cell.textContent = "";
            });
            document.getElementById("bingoMessage").classList.remove("show");
            document.getElementById("wrongBingoMessage").classList.remove("show");
        }

        function markGridCell(number) {
            const cell = document.getElementById(`cell-${number}`);
            if (cell) {
                cell.classList.add("marked");
                cell.textContent = number;
            }
        }

        function speakNumber(number) {
            const utterance = new SpeechSynthesisUtterance(number.toString());
            utterance.lang = 'gl-ES'; // Idioma en español
            speechSynthesis.speak(utterance);
        }

        // Crear la cuadrícula de números
        function createGrid() {
            const gridContainer = document.getElementById("grid");
            for (let i = 1; i <= 99; i++) {
                const cell = document.createElement("div");
                cell.classList.add("grid-cell");
                cell.id = `cell-${i}`;
                gridContainer.appendChild(cell);
            }
        }

        // Inicializar la cuadrícula al cargar la página
        createGrid();

        // Comprobar si los números ingresados están en el conjunto generado
        function checkBingo() {
            const input = document.getElementById("inputNumbers").value;
            const numbersToCheck = input.split(",").map(num => parseInt(num.trim(), 10));

            const bingo = numbersToCheck.every(num => generatedNumbers.has(num));
            
            if (bingo) {
                showBingoMessage();
            } else {
                showWrongBingoMessage();
            }
        }

        // Mostrar mensaje de Bingo
        function showBingoMessage() {
            const bingoMessage = document.getElementById("bingoMessage");
            bingoMessage.classList.add("show");

            setTimeout(() => {
                bingoMessage.classList.remove("show");
            }, 5000); // El mensaje desaparece después de 5 segundos
        }

        // Mostrar mensaje de "Inútil"
        function showWrongBingoMessage() {
            const wrongBingoMessage = document.getElementById("wrongBingoMessage");
            wrongBingoMessage.classList.add("show");

            setTimeout(() => {
                wrongBingoMessage.classList.remove("show");
            }, 3000); // El mensaje desaparece después de 3 segundos
        }
