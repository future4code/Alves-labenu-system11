import app from "./app";
import EstudanteController from "./endpoints/EstudanteController";
import TurmaController from "./endpoints/TurmaController";
// import DocenteController from "./endpoints/DocenteController";

const estudanteController = new EstudanteController();
const turmaController = new TurmaController();
// const docenteController = new DocenteController();

app.post("/estudante/create", estudanteController.createUser);
app.get("/estudante/buscar", estudanteController.buscarEstudante);
app.put("/estudante/mudar", estudanteController.mudarTurmaEstudante);

app.post("/turma/create", turmaController.createTurma);

// app.post("/docente/create", docenteController.createDocente);