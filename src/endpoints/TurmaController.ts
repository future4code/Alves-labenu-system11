import { Request, Response } from "express";
import TurmaData from "../data/TurmaData";
import Turma from "../model/Turma";

export default class TurmaController {
  async createTurma(req: Request, res: Response) {
    try {
      const { id, nome } = req.body;

      if (!id || !nome) {
        throw new Error("Faltam dados!");
      }
      const turma = new Turma(id, nome);
      const turmaData = new TurmaData();
      await turmaData.insertTurma(turma);

      res.status(201).send('Turma criada com sucesso!');
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }

  // async buscarEstudante(req: Request, res: Response) {
  //   try {
  //     const query = req.query.query as string;
  //     if (!query) {
  //       res.statusCode = 400;
  //       throw new Error('É necessário enviar o campo de busca!');
  //     }
  //     const estudanteData = new EstudanteData();
  //     const estudante = await estudanteData.selectEstudante(query);

  //     res.status(201).send(estudante);
  //   } catch (error: any) {
  //     res.status(500).send({ message: error.message })
  //   }
  // }
}