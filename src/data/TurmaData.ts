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
    console.log('entrei aqui')
    const [turmasAtivas] = await this.getConnetion().raw(`
      SELECT *
      FROM TURMA
      WHERE (TURMA.modulo <> 0)
    `)

    return turmasAtivas
  }

  async alterarModuloTurma(id:number, modulo:number): Promise<void> {
    await this.getConnetion().raw(`
      UPDATE TURMA
      SET modulo = ${modulo}
      WHERE (TURMA.id = ${id})
    `)
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