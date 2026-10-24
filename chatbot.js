function normalizarPregunta(texto) {
    return texto
        .toLocaleLowerCase("es")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[¿?¡!.,;:]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function responderDuda(pregunta) {
    const texto = normalizarPregunta(pregunta);

    if (/^(hola|buenas|buenos dias|buenas tardes|buenas noches)\b/.test(texto)) {
        return "¡Hola! Puedo ayudarte con los fundamentos de programación. Pregúntame, por ejemplo, qué es una variable, cómo funciona un ciclo o cómo se consulta una matriz.";
    }
    if (/\b(adios|hasta luego|gracias)\b/.test(texto)) {
        return "¡De nada! Sigue practicando y vuelve cuando tengas otra duda.";
    }
    if (/\b(matriz|matrices|fila|filas|columna|columnas)\b/.test(texto)) {
        return "Una matriz organiza datos en filas y columnas. Se consulta con dos índices: matriz[fila][columna]. Los índices empiezan en 0, así que matriz[1][2] señala la segunda fila y la tercera columna. En Java se declara, por ejemplo, con int[][]; en Python se puede usar una lista de listas. En esta página, abre la tarjeta «Matrices» para ver ejemplos paso a paso.";
    }
    if (/\b(cadena|cadenas|string|caracter|caracteres|substring|charat|extraer|texto)\b/.test(texto)) {
        return "Una cadena es texto formado por caracteres. Las posiciones empiezan en 0: texto[0] es el primer carácter en Python y texto.charAt(0) en Java. Para extraer un fragmento, Python usa texto[0:3] y Java usa texto.substring(0, 3); el límite final no se incluye. Busca «Cadenas y caracteres» en Fundamentos para más ejemplos.";
    }
    if (/\b(variable|variables|dato|datos|tipo|tipos|int|double|boolean|string)\b/.test(texto)) {
        return "Una variable es un nombre que guarda un dato para usarlo después. Por ejemplo, edad = 20 guarda el número 20 en edad. En Java se escribe el tipo, como int edad = 20; en Python el tipo se reconoce del valor: edad = 20. Usa nombres que expliquen qué guardan.";
    }
    if (/\b(si|condicion|condiciones|if|else|elif|decision|decisiones)\b/.test(texto)) {
        return "Una condición permite elegir qué hacer. Por ejemplo, si nota >= 6 es verdadero, el programa puede mostrar «Aprobado»; si es falso, puede mostrar otro mensaje. Java y Python usan if y else; Python escribe dos puntos y organiza el bloque con sangría.";
    }
    if (/\b(ciclo|ciclos|bucle|bucles|for|while|repetir|repeticion)\b/.test(texto)) {
        return "Un ciclo repite instrucciones. for suele servir para recorrer elementos o repetir una cantidad conocida de veces. while repite mientras una condición sea verdadera. En un while, recuerda cambiar algo para que la condición deje de cumplirse y el ciclo termine.";
    }
    if (/\b(funcion|funciones|parametro|parametros|return|metodo|metodos)\b/.test(texto)) {
        return "Una función agrupa instrucciones para reutilizarlas. Recibe argumentos que se asignan a sus parámetros y puede devolver un resultado con return. Croquis para area(4.0, 3.0):\n4.0 y 3.0 (argumentos)\n        ↓\narea(ancho, alto)\n[multiplica ancho * alto]\n        ↓ return\n12.0 (resultado para el programa)\nEn Java, las funciones dentro de una clase suelen llamarse métodos.";
    }
    if (/\b(lista|listas|arreglo|arreglos|array|coleccion|colecciones|indice|indices)\b/.test(texto)) {
        return "Una lista o arreglo guarda varios valores en orden. Se accede a cada elemento con un índice y el primero es el 0. Python usa listas como notas = [8, 9, 10]; Java puede usar int[] notas = {8, 9, 10}. Recorre sus elementos con un ciclo.";
    }
    if (/\b(clase|clases|objeto|objetos|self|this|constructor)\b/.test(texto)) {
        return "Una clase es como un molde que define datos y acciones; un objeto es un ejemplar creado con ese molde. Por ejemplo, una clase Libro puede tener título y autor, y un método para mostrarlos. En Python, self se refiere al objeto actual; en Java se usa this.";
    }
    if (/\b(algoritmo|algoritmos|resolver|problema|promedio)\b/.test(texto)) {
        return "Un algoritmo es una secuencia ordenada de pasos para resolver un problema. Primero identifica la entrada (datos), luego el proceso (operaciones) y finalmente la salida (resultado). Para el promedio de dos notas: sumarlas y dividir la suma entre 2.";
    }
    if (/\b(error|errores|falla|fallo|no funciona|ayuda|duda|entiendo|entiendes)\b/.test(texto)) {
        return "Para entender un error, revisa el mensaje, la línea que señala y los valores que usa el programa. Comprueba nombres, paréntesis, comillas, sangría y límites de índices. Si compartes aquí el mensaje de error y el código relacionado, puedo orientarte con una explicación general.";
    }
    if (/\b(java|python|diferencia|diferencias|comparar|comparacion)\b/.test(texto)) {
        return "Java y Python pueden resolver los mismos problemas, pero escriben algunas instrucciones de forma distinta. Java suele declarar los tipos y usar llaves; Python suele ser más breve y organiza los bloques con sangría. En Tutoriales puedes comparar el mismo ejemplo en ambos.";
    }

    return "Todavía no reconozco esa pregunta. Puedo explicar variables, algoritmos, condiciones, ciclos, funciones, cadenas, listas, matrices y clases. Prueba preguntando «¿Qué es una variable?» o «¿Cómo accedo a un elemento de una matriz?»";
}

const chatbotRaiz = document.createElement("div");
chatbotRaiz.className = "chatbot";
chatbotRaiz.innerHTML = `
    <button class="chatbot-toggle" id="chatbot-toggle" type="button" aria-expanded="false" aria-controls="chatbot-panel">
        ¿Tienes dudas? Pregunta aquí
    </button>
    <section class="chatbot-panel" id="chatbot-panel" aria-label="Asistente de programación" hidden>
        <header class="chatbot-cabecera">
            <div>
                <h2>Ayuda de programación</h2>
                <p>Respuestas básicas, sin conexión a servicios externos</p>
            </div>
            <button class="chatbot-cerrar" type="button" aria-label="Cerrar chat">×</button>
        </header>
        <div class="chatbot-mensajes" id="chatbot-mensajes" role="log" aria-live="polite" aria-relevant="additions"></div>
        <form class="chatbot-formulario">
            <label class="chatbot-etiqueta" for="chatbot-pregunta">Escribe tu pregunta</label>
            <input id="chatbot-pregunta" name="pregunta" type="text" maxlength="300" placeholder="Ej.: ¿Qué es una variable?" autocomplete="off" required>
            <button type="submit">Enviar</button>
        </form>
    </section>
`;
document.body.append(chatbotRaiz);

const chatbotToggle = chatbotRaiz.querySelector("#chatbot-toggle");
const chatbotPanel = chatbotRaiz.querySelector("#chatbot-panel");
const chatbotCerrar = chatbotRaiz.querySelector(".chatbot-cerrar");
const chatbotMensajes = chatbotRaiz.querySelector("#chatbot-mensajes");
const chatbotFormulario = chatbotRaiz.querySelector(".chatbot-formulario");
const chatbotPregunta = chatbotRaiz.querySelector("#chatbot-pregunta");

function agregarMensaje(tipo, texto) {
    const mensaje = document.createElement("p");
    mensaje.className = `chatbot-mensaje chatbot-mensaje-${tipo}`;
    mensaje.textContent = texto;
    chatbotMensajes.append(mensaje);
    chatbotMensajes.scrollTop = chatbotMensajes.scrollHeight;
}

function abrirChat() {
    chatbotPanel.hidden = false;
    chatbotToggle.setAttribute("aria-expanded", "true");
    if (!chatbotMensajes.hasChildNodes()) {
        agregarMensaje("asistente", "¡Hola! Estoy aquí para ayudarte a estudiar. Puedes preguntarme algo como «¿Qué es una variable?».");
    }
    chatbotPregunta.focus();
}

function cerrarChat() {
    chatbotPanel.hidden = true;
    chatbotToggle.setAttribute("aria-expanded", "false");
    chatbotToggle.focus();
}

chatbotToggle.addEventListener("click", () => {
    if (chatbotPanel.hidden) {
        abrirChat();
    } else {
        cerrarChat();
    }
});

chatbotCerrar.addEventListener("click", cerrarChat);

document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && !chatbotPanel.hidden) {
        cerrarChat();
    }
});

chatbotFormulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const pregunta = chatbotPregunta.value.trim();
    if (!pregunta) {
        return;
    }

    agregarMensaje("estudiante", pregunta);
    agregarMensaje("asistente", responderDuda(pregunta));
    chatbotFormulario.reset();
    chatbotPregunta.focus();
});
