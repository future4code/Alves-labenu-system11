import Estudante from "../model/Estudante";
import BaseDataBase from "./BaseDataBase";

export default class EstudanteData extends BaseDataBase {
  async insertEstudante(estudante: Estudante): Promise<void> {
    await this.getConnetion().raw(`
      INSERT
      INTO ESTUDANTE (id, nome, email, data_nasc, turma_id, hobbies)
      VALUES (${estudante.getIdEstudante()}, '${estudante.getName()}', '${estudante.getEmail()}', '${estudante.getData_nasc()}', ${estudante.getTurma_id()}, '${estudante.getHobbie()}')
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
}