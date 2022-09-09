import Docente from "../model/Docente";
import BaseDataBase from "./BaseDataBase";

export default class DocenteData extends BaseDataBase {
  async insertDocente(docente: Docente): Promise<void> {
    await this.getConnetion().raw(`
      INSERT
      INTO DOCENTE (id, nome, email, data_nasc, turma_id)
      VALUES (${docente.getIdDocente()}, '${docente.getNome()}', '${docente.getEmail()}', '${docente.getData_nasc()}', '${docente.getTurma_id()}')
    `)
  }

  async selectDocentes(): Promise<{}[]> {
    const [docentes] = await this.getConnetion().raw(`
      SELECT *
      FROM DOCENTE
    `)

    return docentes
  }

  async alterarDocente(id:number, turma_id:number): Promise<void> {
    await this.getConnetion().raw(`
      UPDATE DOCENTE
      SET turma_id = ${turma_id}
      WHERE (DOCENTE.id = ${id})
    `)
  }
}