import Estudante from "../model/Estudante";
import BaseDataBase from "./BaseDataBase";

export default class EstudanteData extends BaseDataBase {
  async insertEstudante(estudante: Estudante): Promise<void> {
    await this.getConnetion().raw(`
      INSERT
      INTO ESTUDANTE (id, nome, email, data_nasc, turma_id)
      VALUES (${estudante.getIdEstudante()}, '${estudante.getNome()}', '${estudante.getEmail()}', '${estudante.getData_nasc()}', '${estudante.getTurma_id()}')
    `)
  }

  async selectEstudante(query: string): Promise<[]> {
    const [estudante] = await this.getConnetion().raw(`
      SELECT *
      FROM ESTUDANTE
      WHERE (ESTUDANTE.nome LIKE "%${query}%")
    `)

    return estudante
  }

  async alterarEstudante(id:number, turma_id:number): Promise<void> {
    await this.getConnetion().raw(`
      UPDATE ESTUDANTE
      SET turma_id = ${turma_id}
      WHERE (ESTUDANTE.id = ${id})
    `)
  }

  async selectAllEstudantes(): Promise<{}[]> {
    const [estudantes] = await this.getConnetion().raw(`
      SELECT *
      FROM ESTUDANTE
    `)

    return estudantes
  }

  async selectEstudantesByIdTurma(id:number): Promise<void> {
    const [estudantes] = await this.getConnetion().raw(`
      SELECT *
      FROM ESTUDANTE
      WHERE (ESTUDANTE.turma_id = ${id})
    `)

    return estudantes
  }

  async selectEstudantesByHobby(id:number): Promise<{}[]> {
    const [estudantes] = await this.getConnetion().raw(`
      SELECT HOBBY.id as 'hobby_id', HOBBY.nome as 'hobby_name', ESTUDANTE.nome as 'estudante_nome'
      FROM ESTUDANTE_HOBBY
      JOIN ESTUDANTE
      ON ESTUDANTE_HOBBY.estudante_id = ESTUDANTE.id
      JOIN HOBBY
      ON HOBBY.id = ESTUDANTE_HOBBY.hobby_id
      WHERE (ESTUDANTE_HOBBY.hobby_id = ${id})
    `)

    return estudantes
  }
}