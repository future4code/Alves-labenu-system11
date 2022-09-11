import app from "./app";
import EstudanteController from "./endpoints/EstudanteController";
import TurmaController from "./endpoints/TurmaController";
import DocenteController from "./endpoints/DocenteController";

const estudanteController = new EstudanteController();
const turmaController = new TurmaController();
const docenteController = new DocenteController();

app.post("/estudante/create", estudanteController.createUser);
app.get("/estudante/buscar", estudanteController.buscarEstudante);
app.put("/estudante/mudar", estudanteController.mudarTurmaEstudante);
app.get("/estudante/hobby/:id", estudanteController.agruparEstudantesHobby);

app.post("/turma/create", turmaController.createTurma);
app.get("/turma/ativas", turmaController.buscarTurmasAtivas);
app.put("/turma/mudar", turmaController.mudarModuloTurma);
app.get("/:id/participantes", turmaController.buscarParticipantesTurma);
app.get("/signos", turmaController.agruparPorSigno);

app.post("/docente/create", docenteController.createDocente);
app.get("/docente", docenteController.obterDocentes);
app.put("/docente/mudar", docenteController.mudarTurmaDocente);
app.get("/docente/poo", docenteController.agruparDocentesPOO);