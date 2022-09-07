import { Request, Response } from "express";
import EstudanteData from "../data/EstudanteData";
import Estudante from "../model/Estudante";

export default class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { id, nome, email, data_nasc, turma_id, hobbies } = req.body;

      if (!id || !nome || !email || !data_nasc || !turma_id || !hobbies) {
        throw new Error("Faltam dados!");
      }
      // instancia um usuario
      const [day, month, year] = data_nasc.split('/');
      const data_nasc_2 = `${year}-${month}-${day}`;

      const estudante = new Estudante(id, nome, email, data_nasc_2, turma_id, hobbies);
      const estudanteData = new EstudanteData();
      await estudanteData.insertEstudante(estudante);

      res.status(201).send('Estudante criado com sucesso!');
    } catch (error: any) {
      res.status(500).send({ message: error.message })
    }
  }

  async buscarEstudante(req: Request, res: Response) {
    try {
      const query = req.query.query as string;
      if (!query) {
        res.statusCode = 400;
        throw new Error('É necessário enviar o campo de busca!');
      }
      const estudanteData = new EstudanteData();
      const estudante = await estudanteData.selectEstudante(query);

      res.status(201).send(estudante);
    } catch (error: any) {
      res.status(500).send({ message: error.message })
    }
  }
}