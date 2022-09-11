import { Request, Response } from "express";
import TurmaData from "../data/TurmaData";
import Turma from "../model/Turma";
import DocenteData from "../data/DocenteData";
import EstudanteData from "../data/EstudanteData";

export default class TurmaController {
  async createTurma(req: Request, res: Response) {
    try {
      const { nome } = req.body;

      if (!nome) {
        throw new Error("Faltam dados!");
      }
      if (typeof(nome) !== 'string') {
        res.statusCode = 400;
        throw new Error("A variável nome deve ser do tipo string!");
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
      if (!turmasAtivas.length) {
        res.status(201).send("Não existem turmas ativas");
      } else {
        res.status(201).send(turmasAtivas);
      }
      
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }

  async mudarModuloTurma(req: Request, res: Response) {
    try {
      const { turma_id, modulo } = req.body;
      if (!turma_id || !modulo) {
        throw new Error("Faltam dados!");
      }
      if (typeof(turma_id) !== 'number') {
        res.statusCode = 400;
        throw new Error("O ID da turma deve ser do tipo number!");
      }
      if (typeof(modulo) !== 'number') {
        res.statusCode = 400;
        throw new Error("O módulo da turma deve ser do tipo number!");
      }
      if (modulo < 0 || modulo > 6) {
        throw new Error("O módulo deve ser um número entre 0 e 6!");
      }

      const turmaData = new TurmaData();
      const turmas = await turmaData.selectTurmasById(turma_id);
      if (!turmas.length) {
        res.statusCode = 400;
        throw new Error("Não existem turmas cadastradas com este ID!");
      }
      await turmaData.alterarModuloTurma(turma_id, modulo);

      res.status(201).send('Módulo da turma alterado com sucesso!');
    } catch (error: any) {
      res.status(500).send({ message: error.message })
    }
  }

  async buscarParticipantesTurma(req: Request, res: Response) {
    try {
      const turma_id = Number(req.params.id);
      
      const turmaData = new TurmaData();
      const turmas:any = await turmaData.selectTurmasById(turma_id);
      if (!turmas.length) {
        res.statusCode = 400;
        throw new Error("Não existem turmas cadastradas com este ID!");
      }

      const docenteData = new DocenteData();
      const docentes:any = await docenteData.selectDocentesByIdTurma(turma_id);

      const estudanteData = new EstudanteData();
      const estudantes:any = await estudanteData.selectEstudantesByIdTurma(turma_id);

      const resultado = {
        "id_turma": turma_id,
        "nome_turma": turmas[0].nome,
        "docentes": [],
        "alunos": []
      }

      estudantes.forEach( (estudante:any) => {
        resultado.alunos.push(estudante.nome)
      })

      docentes.forEach( (docente:any) => {
        resultado.docentes.push(docente.nome)
      })

      res.status(201).send(resultado);
    } catch (error: any) {
      res.status(500).send({ message: error.message })
    }
  }

  async agruparPorSigno(req: Request, res: Response) {
    try {
      const signo = req.query.signo;

      if (signo !== "capricornio" &&
          signo !== "aquario" &&
          signo !== "peixes" &&
          signo !== "aries" &&
          signo !== "touro" &&
          signo !== "gemeos" &&
          signo !== "cancer" &&
          signo !== "leao" &&
          signo !== "virgem" &&
          signo !== "libra" &&
          signo !== "escorpiao" &&
          signo !== "sagitario"
      ) {
        throw new Error("Signo não existente!");
      }

      const docenteData = new DocenteData();
      const docentes = await docenteData.selectDocentes();

      const estudanteData = new EstudanteData();
      const estudantes = await estudanteData.selectAllEstudantes();

      const resultado = {
        "signo": signo,
        "estudantes": [],
        "docentes": []
      }

      estudantes.forEach( (estudante:any) => {
        const dia = estudante.data_nasc.getDate();
        const mes = estudante.data_nasc.getMonth()+1;
        if (signo === "capricornio") {
          if(mes===12 && dia>=22) resultado.estudantes.push(estudante.nome)
        } else if (signo === "aquario") {
          if( (mes===1 && dia>=21) || (mes===2 && dia<=18)) resultado.estudantes.push(estudante.nome)
        } else if (signo === "peixes") {
          if( (mes===2 && dia>=19) || (mes===3 && dia<=20)) resultado.estudantes.push(estudante.nome)
        } else if (signo === "aries") {
          if( (mes===3 && dia>=21) || (mes===4 && dia<=20)) resultado.estudantes.push(estudante.nome)
        } else if (signo === "touro") {
          if( (mes===4 && dia>=21) || (mes===5 && dia<=20)) resultado.estudantes.push(estudante.nome)
        } else if (signo === "gemeos") {
          if( (mes===5 && dia>=21) || (mes===6 && dia<=20)) resultado.estudantes.push(estudante.nome)
        } else if (signo === "cancer") {
          if( (mes===6 && dia>=21) || (mes===7 && dia<=22)) resultado.estudantes.push(estudante.nome)
        } else if (signo === "leao") {
          if( (mes===7 && dia>=23) || (mes===8 && dia<=22)) resultado.estudantes.push(estudante.nome)
        } else if (signo === "virgem") {
          if( (mes===8 && dia>=23) || (mes===9 && dia<=22)) resultado.estudantes.push(estudante.nome)
        } else if (signo === "libra") {
          if( (mes===9 && dia>=23) || (mes===10 && dia<=22)) resultado.estudantes.push(estudante.nome)
        } else if (signo === "escorpiao") {
          if( (mes===10 && dia>=23) || (mes===11 && dia<=21)) resultado.estudantes.push(estudante.nome)
        } else if (signo === "sagitario") {
          if( (mes===11 && dia>=22) || (mes===12 && dia<=21)) resultado.estudantes.push(estudante.nome)
        }
      })

      docentes.forEach( (docente:any) => {
        const dia = docente.data_nasc.getDate();
        const mes = docente.data_nasc.getMonth()+1;
        if (signo === "capricornio") {
          if(mes===12 && dia>=22) resultado.docentes.push(docente.nome)
        } else if (signo === "aquario") {
          if( (mes===1 && dia>=21) || (mes===2 && dia<=18)) resultado.docentes.push(docente.nome)
        } else if (signo === "peixes") {
          if( (mes===2 && dia>=19) || (mes===3 && dia<=20)) resultado.docentes.push(docente.nome)
        } else if (signo === "aries") {
          if( (mes===3 && dia>=21) || (mes===4 && dia<=20)) resultado.docentes.push(docente.nome)
        } else if (signo === "touro") {
          if( (mes===4 && dia>=21) || (mes===5 && dia<=20)) resultado.docentes.push(docente.nome)
        } else if (signo === "gemeos") {
          if( (mes===5 && dia>=21) || (mes===6 && dia<=20)) resultado.docentes.push(docente.nome)
        } else if (signo === "cancer") {
          if( (mes===6 && dia>=21) || (mes===7 && dia<=22)) resultado.docentes.push(docente.nome)
        } else if (signo === "leao") {
          if( (mes===7 && dia>=23) || (mes===8 && dia<=22)) resultado.docentes.push(docente.nome)
        } else if (signo === "virgem") {
          if( (mes===8 && dia>=23) || (mes===9 && dia<=22)) resultado.docentes.push(docente.nome)
        } else if (signo === "libra") {
          if( (mes===9 && dia>=23) || (mes===10 && dia<=22)) resultado.docentes.push(docente.nome)
        } else if (signo === "escorpiao") {
          if( (mes===10 && dia>=23) || (mes===11 && dia<=21)) resultado.docentes.push(docente.nome)
        } else if (signo === "sagitario") {
          if( (mes===11 && dia>=22) || (mes===12 && dia<=21)) resultado.docentes.push(docente.nome)
        }
      })

      res.status(201).send(resultado);
    } catch (error: any) {
      res.status(500).send({ message: error.message })
    }
  }
}