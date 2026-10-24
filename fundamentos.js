const demoRunners = {
    algoritmos() {
        const notas = [8, 10];
        const promedio = notas.reduce((total, nota) => total + nota, 0) / notas.length;
        return String(promedio);
    },
    variables() {
        let edad = 20;
        edad += 1;
        return String(edad);
    },
    condiciones() {
        const nota = 8;
        const resultado = nota >= 6 ? "Aprobado" : "A seguir practicando";
        return [resultado, 1, 2, 3].join("\n");
    },
    funciones() {
        const area = (ancho, alto) => ancho * alto;
        return area(4, 3).toFixed(1);
    },
    cadenas() {
        const palabra = "programar";
        return `${palabra.charAt(0)}\n${palabra.substring(0, 4)}`;
    },
    listas() {
        const notas = [8, 9, 10];
        const promedio = notas.reduce((total, nota) => total + nota, 0) / notas.length;
        return promedio.toFixed(1);
    },
    matrices() {
        const matriz = [[1, 2, 3], [4, 5, 6]];
        const elemento = matriz[1][2];
        const filas = matriz.map((fila) => fila.join(" ")).join("\n");
        return `Elemento [1][2]: ${elemento}\nRecorrido:\n${filas}`;
    },
    clases() {
        const libro = {
            titulo: "El principito",
            autor: "Antoine",
            mostrar() {
                return `${this.titulo} — ${this.autor}`;
            },
        };
        return libro.mostrar();
    },
};

document.querySelectorAll(".tema-ejecutar").forEach((button) => {
    button.addEventListener("click", () => {
        const demoName = button.dataset.demo;
        const runner = demoName ? demoRunners[demoName] : undefined;
        if (!runner) {
            throw new Error(`No se encontró la demostración "${demoName}".`);
        }

        const outputId = button.getAttribute("aria-controls");
        const outputPanel = outputId ? document.getElementById(outputId) : null;
        const output = outputPanel?.querySelector("pre");
        if (!(outputPanel instanceof HTMLElement) || !(output instanceof HTMLElement)) {
            throw new Error(`No se encontró el panel de salida para "${demoName}".`);
        }

        const isExpanded = button.getAttribute("aria-expanded") === "true";
        if (isExpanded) {
            outputPanel.hidden = true;
            button.setAttribute("aria-expanded", "false");
            button.textContent = "Ver resultado de ejemplo";
            return;
        }

        output.textContent = runner();
        outputPanel.hidden = false;
        button.setAttribute("aria-expanded", "true");
        button.textContent = "Ocultar resultado de ejemplo";
    });
});
