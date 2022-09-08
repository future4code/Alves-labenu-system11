import app from "./app";
import EstudanteController from "./endpoints/EstudanteController";
import TurmaController from "./endpoints/TurmaController";

const estudanteController = new EstudanteController();
const turmaController = new TurmaController();

app.post("/estudante/create", estudanteController.createUser);
app.get("/estudante/buscar", estudanteController.buscarEstudante);
app.post("/turma/create", turmaController.createTurma);