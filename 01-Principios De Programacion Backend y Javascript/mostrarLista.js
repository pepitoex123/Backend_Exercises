const mostrarLista = (lista) => {
    if(Array.isArray(lista)){
        if(lista.length > 0){
            console.log(...lista);
        }else{
            console.log("Lista vacia");
        }
    }else{
        console.log("El input no es un array :O");
    }
}

let coolArray = [1,2,3,4,5]


mostrarLista(coolArray);
