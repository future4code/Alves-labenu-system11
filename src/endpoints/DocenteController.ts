import { Request, Response } from "express";
import DocenteData from "../data/DocenteData";
import TurmaData from "../data/TurmaData";
import EspecialidadeData from "../data/EspecialidadeData";
import DocenteEspecialidadeData from "../data/DocenteEspecialidadeData";
import Docente from "../model/Docente";

export default class UserController {
  async createDocente(req: Request, res: Response) {
    try {
      const { nome, email, data_nasc, especialidades } = req.body;

      if (!nome || !email || !data_nasc || !especialidades.length) {
        throw new Error("Faltam dados!");
      }

      // FAZER VERIFICAÇÕES COM RELAÇÃO AS ESPECIALIDADE
      // (SÓ PODEM SER ALGUMA(S) DENTRE AS 6)

      const [day, month, year] = data_nasc.split('/');
      const data_nasc_2 = `${year}-${month}-${day}`;
      const id = new Date().getTime();

      // Criação do novo docente
      const turmaData = new TurmaData();
      const turmas:any = await turmaData.selectTurma(); // ARRUMAR O ANY
      if (!turmas.length) {
        throw new Error("Não existem turmas, logo, não é possível criar docentes!");
      }
      const turma_id = turmas[0].id
      const docente = new Docente(id, nome, email, data_nasc_2, turma_id);
      const docenteData = new DocenteData();
      await docenteData.insertDocente(docente);

      
      // Atualização tabela DOCENTE_ESPECIALIDADE
      const especialidadeData = new EspecialidadeData();
      const especialidadeCadastrada:{}[] = await especialidadeData.selectEspecialidade();

      const docenteEspecialidadeData = new DocenteEspecialidadeData();

      const salvarDocenteEspecialidade = async(idEspecialidade:number) => {
        await docenteEspecialidadeData.insertDocenteEspecialidade(id, idEspecialidade);
      }
      especialidades.forEach( (especialidade:any) => {
        const foundIdEspecialidade:any = especialidadeCadastrada.find( (espCad:any) => {
          return espCad.nome === especialidade
        })
        if(foundIdEspecialidade) salvarDocenteEspecialidade(foundIdEspecialidade.id)
      })

      res.status(201).send('Docente criado com sucesso!');
    } catch (error: any) {
      res.status(500).send({ message: error.message })
    }
  }

  async obterDocentes(req: Request, res: Response) {
    try {
      const docenteData = new DocenteData();
      const docentes = await docenteData.selectDocentes();

      res.status(201).send(docentes);
    } catch (error: any) {
      res.status(500).send({ message: error.message })
    }
  }

  async mudarTurmaDocente(req: Request, res: Response) {
    try {
      const { id, turma_id } = req.body;
      if (!id || !turma_id) {
        throw new Error("Faltam dados!");
      }

      // Verificações relacionadas ao docente
      const docenteData = new DocenteData();
      const docentes:any = await docenteData.selectDocentes(); // ARRUMAR O ANY
      if (!docentes.length) {
        throw new Error("Não existem docentes cadastrados, logo, não é possível alterar a turma do docente!");
      }
      const docente = docentes.filter( (docente:any) => {
        return docente.id === id
      })
      if (!docente) {
        throw new Error("Não existe docente cadastrado(a) com este ID!");
      }

      // Verificações relacionadas a turma
      const turmaData = new TurmaData();
      const turmas:any = await turmaData.selectTurma(); // ARRUMAR O ANY
      if (!turmas.length) {
        throw new Error("Não existem turmas cadastradas, logo, não é possível mudar a turma do estudante!");
      }
      const turmaExiste = turmas.filter( (turma:any) => {
        return turma.id === turma_id
      })
      if (!turmaExiste.length) {
        throw new Error("Não existem turmas cadastradas com este ID!");
      }

      await docenteData.alterarDocente(id, turma_id);

      res.status(201).send('Turma do docente alterada com sucesso!');
    } catch (error: any) {
      res.status(500).send({ message: error.message })
    }
  }
}