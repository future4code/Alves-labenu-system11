import BaseDataBase from "./BaseDataBase";

export default class DoceenteEspecialidadeData extends BaseDataBase {
  async insertDocenteEspecialidade(idDocente:number, idEspecialidade:number): Promise<void> {
    const idTabela = new Date().getTime()+Math.floor(Math.random()*1000); 
    await this.getConnetion().raw(`
      INSERT
      INTO DOCENTE_ESPECIALIDADE (id, docente_id, especialidade_id)
      VALUES (${idTabela}, ${idDocente}, ${idEspecialidade})
    `)
  }
}