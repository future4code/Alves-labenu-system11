import Turma from "../model/Turma";
import BaseDataBase from "./BaseDataBase";

export default class TurmaData extends BaseDataBase {
  async insertTurma(turma: Turma): Promise<void> {
    await this.getConnetion().raw(`
      INSERT
      INTO TURMA (id, nome, modulo)
      VALUES (${turma.getIdTurma()}, '${turma.getNome()}', '${turma.getModulo()}')
    `)
  }

  async selectTurma(): Promise<{}[]> {
    const [turmas] = await this.getConnetion().raw(`
      SELECT *
      FROM TURMA
    `)

    return turmas
  }

  async selectTurmasAtivas(): Promise<{}[]> {
    const [turmasAtivas] = await this.getConnetion().raw(`
      SELECT *
      FROM TURMA
      WHERE (TURMA.modulo <> 0)
    `)

    return turmasAtivas
  }

  async selectTurmasById(id:number): Promise<{}[]> {
    const [turmas] = await this.getConnetion().raw(`
      SELECT *
      FROM TURMA
      WHERE (TURMA.id = ${id})
    `)

    return turmas
  }

  async alterarModuloTurma(id:number, modulo:number): Promise<void> {
    await this.getConnetion().raw(`
      UPDATE TURMA
      SET modulo = ${modulo}
      WHERE (TURMA.id = ${id})
    `)
  }

  async selectParticipantes(id:number): Promise<{}[]> {
    const [participantes] = await this.getConnetion().raw(`
      SELECT ESTUDANTE.nome as 'nome_estudante', DOCENTE.nome as 'nome_docente', TURMA.nome as 'nome_turma', TURMA.id as 'id_turma'
      FROM TURMA
      JOIN ESTUDANTE
      ON ESTUDANTE.turma_id = TURMA.id
      JOIN DOCENTE
      ON DOCENTE.turma_id = TURMA.id
      WHERE (TURMA.id = ${id})
    `)

    return participantes
  }
}