import { Request, Response } from "express";
import TurmaData from "../data/TurmaData";
import Turma from "../model/Turma";

export default class TurmaController {
  async createTurma(req: Request, res: Response) {
    try {
      const { nome } = req.body;

      if (!nome) {
        throw new Error("Faltam dados!");
      }

      const id:number = new Date().getTime();
      const turma = new Turma(id, nome);
      const turmaData = new TurmaData();
      await turmaData.insertTurma(turma);

      res.status(201).send('Turma criada com sucesso!');
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }

  async buscarTurmasAtivas(req: Request, res: Response) {
    try {
      
      const turmaData = new TurmaData();
      const turmasAtivas:any = await turmaData.selectTurmasAtivas();

      res.status(201).send(turmasAtivas);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }

  async mudarModuloTurma(req: Request, res: Response) {
    try {
      const { id, modulo } = req.body;
      if (!id || !modulo) {
        throw new Error("Faltam dados!");
      }

      if (modulo < 0 || modulo > 6) {
        throw new Error("O módulo deve ser um número entre 0 e 6!");
      }

      const turmaData = new TurmaData();
      await turmaData.alterarModuloTurma(id, modulo);

      res.status(201).send('Turma do estudante alterada com sucesso!');
    } catch (error: any) {
      res.status(500).send({ message: error.message })
    }
  }

  async buscarParticipantes(req: Request, res: Response) {
    try {
      const turma_id = Number(req.params.id);

      const turmaData = new TurmaData();
      const participantes:any = await turmaData.selectParticipantes(turma_id);

      const resultado = {
        "docente": participantes[0].nome_docente,
        "alunos": [],
        "id_turma": participantes[0].id_turma,
        "nome_turma": participantes[0].nome_turma
      }

      participantes.forEach( (participante:any) => {
        resultado.alunos.push(participante.nome_estudante)
      })

      res.status(201).send(resultado);
    } catch (error: any) {
      res.status(500).send({ message: error.message })
    }
  }
}