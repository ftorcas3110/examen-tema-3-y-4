import express from "express";

const app = express();
  
app.get("/", (req, res) => {     
    function mostrarPersonaje (personaje){
        return `
        <h1>Datos del personaje ${personaje.id}</h1>
        <p>Nombre: ${personaje.name}</p>
        <p>Especie: ${personaje.species}</p>
        <div><img src="${personaje.image}"></div>
        `
    }
    fetch (`https://rickandmortyapi.com/api/character/`)
    .then(respuesta => respuesta.json())
    .then(datos => {
        let personaje = datos.results
        res.send(`<h1>Personajes de Rick y Morty</h1>
        <form method="post">
        <label for="id">Id del personaje:</label><br>
        <input type="number" id="id" name="id"><br>
        <input type="submit" value="Buscar">
        </form> 
        <hr>
        ${mostrarPersonaje(3)}
        `)
    })



})

app.listen(3000);