window.addEventListener("load", function() {

    var contador = 1;
    var columna = document.getElementById("columna");
    var contenedor = document.getElementById("contenedor");
    var span = document.getElementById("span");
    var formulario = document.getElementById("formulario");
    var input = document.getElementById("input");
    var boton = document.getElementById("boton");
    

    span.addEventListener("click", function() {
        span.style.display = "none";
        var formulario = document.getElementById("formulario");
        formulario.style.display = "block";
        span.parentElement.classList.add("caja");
        input.focus();
    });
        
    boton.addEventListener("click", function(e) {
        e.preventDefault();

        var contenedorLista = document.createElement("div");
/*        contenedorLista.classList.add("");*/

        agregarLista();
        agregarColumna();
        span.parentElement.classList.add("position");

    });

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

        enlace.addEventListener("click", function() {
            agregarTarjeta(enlace);
        });
    }
    
    function agregarColumna() {
        var contenedorDerecha = document.createElement("div");
        
        columna.appendChild(contenedorDerecha);
        contenedorDerecha.appendChild(span);
        contenedorDerecha.insertBefore(formulario, contenedorDerecha.childNodes[0]);

        contenedorDerecha.classList.add("contenedorDerecha", "target");
        span.style.display = "block";

        contenedorDerecha.addEventListener()
    }

    var target = document.getElementsByClassName("target"); 
        for (var i = 0, l = target.length; i < l; i++) { 
        target[i].addEventListener("dragover", arrastraSobre); 
        target[i].addEventListener("drop", soltar);
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
            div.draggable = true;
            div.id = "id" + contador;
            contador++;
            div.addEventListener("dragstart", empiezaArrastrar);

            div.innerHTML = textoDiv;
            enlace.parentElement.appendChild(div);
            div.classList.add("divBorder");
            div.parentElement.appendChild(enlace);

            formTextArea.style.display = "none";
            enlace.style.display = "block";
        });
    }

    function empiezaArrastrar (e) {
        e.dataTransfer.setData("text", this.id);
        this.classList.add("opaco");
    }

    function soltar (e) {
        var elementoArrastrado = document.getElementById(e.transferData.getData("text"));
        this.insertBefore(elementoArrastrado, this.children[1]);
    }

    function arrastraSobre (e) {
        e.preventDefault();
    }

}); 