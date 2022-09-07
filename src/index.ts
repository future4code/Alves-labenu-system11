import app from "./app";
import EstudanteController from "./endpoints/EstudanteController";

const estudanteController = new EstudanteController();

app.get("/estudante/create", estudanteController.createUser);
app.get("/estudante/buscar", estudanteController.buscarEstudante);