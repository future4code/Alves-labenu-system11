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