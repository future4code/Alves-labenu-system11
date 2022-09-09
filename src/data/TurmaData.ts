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

  // async selectEstudante(query: string): Promise<[]> {
  //   const [estudante] = await this.getConnetion().raw(`
  //     SELECT *
  //     FROM ESTUDANTE
  //     WHERE (ESTUDANTE.nome LIKE "%${query}%")
  //   `)
  //   return estudante
  // }
}