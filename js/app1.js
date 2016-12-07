; (function () {

    window.addEventListener("load", cargaPagina);

    var columna = document.getElementById("columna");
    var contenedor = document.getElementById("contenedor");
    var span = document.getElementById("span");
    var formulario = document.getElementById("formulario");
    var input = document.getElementById("input");
    var boton = document.getElementById("boton");

    function cargaPagina () {
        span.addEventListener("click", mostrarTextArea);
        boton.addEventListener("click", prevent);
        boton.addEventListener("click", agregarLista);            
        span.parentElement.classList.add("position");
        boton.addEventListener("click", agregarColumna);            
    };

    function prevent (e) {
        e.preventDefault();
    };

    function mostrarTextArea () {
        span.style.display = "none";
        var formulario = document.getElementById("formulario");
        formulario.style.display = "block";
        span.parentElement.classList.add("caja");
        input.focus();
    };
            

    function agregarLista () {
        formulario.style.display = "none";

        var texto = input.value;
        var lista = document.createElement("div");
        var enlace = document.createElement("a");
        var textoEnlace = document.createTextNode("Añadir una tarjeta...");

        lista.innerHTML = texto;
        lista.classList.add("lista");
        input.value = "";

        enlace.appendChild(textoEnlace);
        span.parentElement.insertBefore(lista, span.parentElement.childNodes[0]);
        span.parentElement.insertBefore(enlace, span.parentElement.childNodes[1]);

        enlace.classList.add("enlace");
        enlace.setAttribute("href", "#");

        enlace.addEventListener("click", agregarTarjeta(enlace));
    }

    function agregarColumna() {
        var contenedorDerecha = document.createElement("div");
        
        columna.appendChild(contenedorDerecha);
        contenedorDerecha.appendChild(span);
        contenedorDerecha.insertBefore(formulario, contenedorDerecha.childNodes[0]);

        contenedorDerecha.classList.add("contenedorDerecha");
        span.style.display = "block";
    }

    function agregarTarjeta (enlace) {
        enlace.style.display = "none";

        var formTextArea = document.createElement("form");
        var textArea = document.createElement("textarea");
        var botonText = document.createElement("button");
        var textoBoton = document.createTextNode("Añadir");

        enlace.parentElement.appendChild(formTextArea);
        formTextArea.insertBefore(textArea, formTextArea.childNodes[0]);
        formTextArea.insertBefore(botonText, formTextArea.childNodes[1]);
        botonText.appendChild(textoBoton);

        textArea.classList.add("textTarget");
        textArea.focus();
        botonText.classList.add("button");
        botonText.setAttribute("type", "submit");

        botonText.addEventListener("click", function(e) {
            e.preventDefault();

            var textoDiv = textArea.value;
            var div = document.createElement("div");

            div.innerHTML = textoDiv;
            enlace.parentElement.appendChild(div);
            div.classList.add("divBorder");
            div.parentElement.appendChild(enlace);

            formTextArea.style.display = "none";
            enlace.style.display = "block";
        });
    }
})();
