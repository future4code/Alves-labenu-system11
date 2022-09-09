import { Request, Response } from "express";
import EstudanteData from "../data/EstudanteData";
import TurmaData from "../data/TurmaData";
import HobbyData from "../data/HobbyData";
import EstudanteHobbyData from "../data/EstudanteHobbyData";
import Estudante from "../model/Estudante";

export default class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { nome, email, data_nasc, hobby } = req.body;

      if (!nome || !email || !data_nasc || !hobby.length) {
        throw new Error("Faltam dados!");
      }
      const [day, month, year] = data_nasc.split('/');
      const data_nasc_2 = `${year}-${month}-${day}`;
      const id = new Date().getTime();

      // Atualização tabela HOBBY
      const hobbyData = new HobbyData();
      const hobbies:{}[] = await hobbyData.selectHobby();

      const salvarHobby = async(hobby:string) => {
        await hobbyData.insertEstudante(new Date().getTime(), hobby);
      }

      hobby.forEach( (hobby:any) => {
        let foundHobby = undefined;
        foundHobby = hobbies.find( (hobbie:any) => {
          return hobbie.nome === hobby
        })
        if (!foundHobby) salvarHobby(hobby)
      })

      const turmaData = new TurmaData();
      const turmas:any = await turmaData.selectTurma(); // ARRUMAR O ANY
      if (!turmas.length) {
        throw new Error("Não existem turmas, logo, não é possível criar estudantes!");
      }

      const turma_id = turmas[0].id
      const estudante = new Estudante(id, nome, email, data_nasc_2, turma_id);
      const estudanteData = new EstudanteData();
      await estudanteData.insertEstudante(estudante);

      // Atualização tabela ESTUDANTE_HOBBY
      const hobbies2:{}[] = await hobbyData.selectHobby();
      const estudanteHobbyData = new EstudanteHobbyData();
      const salvarEstudanteHobby = async(idhobby:number) => {
        await estudanteHobbyData.insertEstudanteHobby(id, idhobby);
      }
      hobby.forEach( (hobby:any) => {
        const foundIdHobby:any = hobbies2.find( (hobbie:any) => {
          return hobbie.nome === hobby
        })
        if(foundIdHobby) salvarEstudanteHobby(foundIdHobby.id)
      })

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

  async mudarTurmaEstudante(req: Request, res: Response) {
    try {
      const { id, turma } = req.body;
      if (!id || !turma) {
        throw new Error("Faltam dados!");
      }

      const estudanteData = new EstudanteData();
      await estudanteData.alterarEstudante(id, turma);


      res.status(201).send('Turma do estudante alterada com sucesso!');
    } catch (error: any) {
      res.status(500).send({ message: error.message })
    }
  }


}