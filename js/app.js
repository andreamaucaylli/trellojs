;(function(){
    
    var agregarForm = document.getElementById("agregarForm");
    var button = document.getElementById("button");
    var input = document.getElementById("input");
    var nuevoForm = document.getElementById("nuevoForm");
    var contenedor = document.getElementById("contenedor");
    var contador = 1;

    window.addEventListener("load", cargar);

    function cargar(){
        agregarForm.addEventListener("click", function(){
            hideElement(nuevoForm,agregarForm);
            input.focus();
            input.value="";
        });

        button.addEventListener("click", function(e){
            e.preventDefault();
            var contenedorLista = document.createElement("div");
            contenedorLista.classList.add("d-inlineblock");
            
            var remover = nuevoForm.parentNode;
            contenedor.appendChild(contenedorLista);
            contenedorLista.appendChild(nuevoForm);
            contenedorLista.appendChild(agregarForm);
            remover.remove();

            var contenedorTarjetas = document.createElement("div");
            contenedorTarjetas.classList.add("trello-body");
            contenedor.insertBefore(contenedorTarjetas,contenedor.lastElementChild);
            contenedorTarjetas.addEventListener("dragleave", dejarTrello);
            contenedorTarjetas.addEventListener("dragover", arrastrarSobreTrello);
            contenedorTarjetas.addEventListener("drop", soltarTrello);
            contenedorTarjetas.addEventListener("dragend", terminaArrastrarTrello); 

            hideElement(nuevoForm,agregarForm);

            crearElementos("div", "nuevaLista", input.value, contenedorTarjetas);
            crearElementos("div", "agregar", "Añadir una tarjeta", contenedorTarjetas);

            var agregar = document.getElementsByClassName("agregar");
            agregar[agregar.length-1].addEventListener("click", function(){
                this.classList.add("d-none");
                newForm("form", "fomulario", contenedorTarjetas,this);
            });

        }); 
    }

    function hideElement(a,b){
            a.classList.toggle("d-none");
            b.classList.toggle("d-none");
    }

    function crearElementos(element, clase, texto, contenedor){
        var div = document.createElement(element);
        div.classList.add(clase);
        div.innerHTML= texto;
        contenedor.appendChild(div);
    }

    function newForm(form, clase, contenedor, agregarTarjeta){
        var form = document.createElement(form);
        form.classList.add(clase);
        crearElementos("textarea","textarea","", form);
        crearElementos("button", "boton", "Añadir", form);
        contenedor.appendChild(form);

        form.lastElementChild.addEventListener("click", function(e){
            e.preventDefault();
            agregarTarjeta.classList.remove("d-none");
            form.classList.add("d-none");

            var text = form.firstElementChild.value;

            var div = document.createElement("div");
            div.classList.add("text-tarjetas");
            div.draggable = true;
            div.setAttribute("id", "id" + contador);
            div.innerHTML = text;
            contador ++;
            div.addEventListener("dragstart", empiezaArrastrar);
            div.addEventListener("drop", soltar);
            div.addEventListener("dragend", terminaArrastrar);          
            contenedor.insertBefore(div, agregarTarjeta);

        });
    }


    function empiezaArrastrar(e) {
        e.dataTransfer.setData("text", this.id);
        this.classList.add("opacidad");
        
    }

    function arrastrarSobreTrello(e) {
        e.preventDefault();
        this.classList.add("bg-blue");
    }

    function dejarTrello(e) {
        e.preventDefault();
        this.classList.remove("bg-blue");
    }


    function soltar(e) {
       e.preventDefault();

    }

    function soltarTrello(e) {
       e.preventDefault();
       var arrastrado = e.dataTransfer.getData("text");
       var elemento = document.getElementById(arrastrado);
       this.insertBefore(elemento, this.children[1]);
    }

    function terminaArrastrarTrello(e){
        this.classList.remove("bg-blue");
    }

    function terminaArrastrar(e) {
        this.classList.remove("opacidad");
        this.classList.add("animated", "wobble");
    }

}());