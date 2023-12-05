import express from "express";
const app = express();

let Alumnos = [
  {
    id: 1,
    nombre: "Eva",
    edad: 22,
    domicilio: { calle: "Antigua", num: 3, localidad: "Lucena" },
  },
  {
    id: 2,
    nombre: "Juan",
    edad: 21,
    domicilio: {calle: "Larios", num: 11, localidad: "Malaga"},
  },
  {
    id: 3,
    nombre: "Andrea",
    edad: 67,
    domicilio: {calle: "Nueva", num: 71, localidad: "Antequera"},
  },
  {
    id: 4,
    nombre: "Paco",
    edad: 21,
    domicilio: {calle: "Ancha", num: 6, localidad: "Montilla"},
  },
];

app.use(express.json());

// GET
app.get("/api/alumnos", (request, response) => response.json(Alumnos));

// POST
app.post("/api/alumnos", (request, response) => {
  if (!request.is("json"))
    return response.json({ message: "Debes proporcionar datos JSON" });

  let sig = Math.max(...Alumnos.map((u) => u.id)) + 1;

  const { nombre, edad, domicilio } = request.body;
  Alumnos.push({ id: sig, nombre, edad, domicilio });
  return response.json(Alumnos);
});

// GET
app.get("/api/alumnos/:id", (request, response) => {
  let alumno = Alumnos.find((alumno) => alumno.id == request.params.id);

  if (alumno !== undefined) {
    return response.json(alumno);
  } else {
    response.json({ message: "El elemento no ha sido encontrado" });
  }
});

// DELETE
app.delete("/api/alumnos/:id", (request, response) => {
  const pos = Alumnos.findIndex((alumno) => alumno.id == request.params.id);

  if (pos != -1) {
    Alumnos.splice(pos, 1);
    return response.json(Alumnos);
  } else {
    response.json({ message: "El elemento no ha sido encontrado" });
  }
});

// PUT
app.put("/api/alumnos/:id", (request, response) => {
  if (!request.is("json"))
    return response.json({ message: "Debes proporcionar datos JSON" });

  const { id } = request.params;
  const { nombre, edad, domicilio } = request.body;

  const pos = Alumnos.findIndex((alumno) => alumno.id == id);

  if (pos != -1) {
    Alumnos.splice(pos, 1, { id, nombre, edad, domicilio });
    return response.json(Alumnos);
  } else {
    response.json({ message: "El elemento no ha sido encontrado" });
  }
});

app.listen(3000);