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
}