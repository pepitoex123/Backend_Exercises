class Usuario{

    constructor(nombre,apellido,libros,mascotas){
        if(typeof nombre === "string"){
            this.nombre = nombre;
        }
        if(typeof apellido === "string"){
            this.apellido = apellido;
        }
        if(Array.isArray(libros) && libros.length > 0 && libros.every((item) => typeof item === "object")){
            this.libros = libros;
        }
        if(Array.isArray(mascotas) && mascotas.length > 0 && mascotas.every((item) => typeof item === "string")){
            this.mascotas = mascotas;
        }
    }

    getFullName(){
        return (`${this.nombre} ${this.apellido}`)
    }

    addMascota(mascota){
        try{
            if(typeof mascota !== "string"){
                throw new Error("La mascota que has introducido no es de tipo string, estás seguro que esto es un nombre?")
            }else{
                this.mascotas.push(mascota);
            }
        }catch(error){
            console.log(error.message);
        }
    }

    countMascotas(){
        return this.mascotas.length;
    }

    addBook(nombre,autor){
        try{
            if(typeof nombre !== "string" || typeof autor !== "string"){
                throw new Error("Uno de los parámetros no es de tipo string");
            }else{
                let objetoAIngresar = {nombre,autor};
                this.libros.push(objetoAIngresar);
            }
        }catch(error){
            console.log(error.message);
        }
    }

    getBookNames(){
        let arrayResultado = [];
        for(let i=0;i<this.libros.length;i++){
            arrayResultado.push(this.libros[i]["nombre"])
        }
        return arrayResultado;
    }
}


let testClase = new Usuario("Mike","Tofu",[{nombre: "Chocolate", autor: "John Doe"}],["Tofi","Celeste"]);

console.log(testClase.getFullName());
console.log(testClase.countMascotas());
testClase.addMascota("Gandalf");
testClase.addBook("Test", "Maria Doe");

let nombresDeLibros = testClase.getBookNames();

console.log("Nombres de los libros: ", ...nombresDeLibros);