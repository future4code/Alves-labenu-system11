import BaseDataBase from "./BaseDataBase";

export default class DoceenteEspecialidadeData extends BaseDataBase {
  // async selectHobby(): Promise<[]> {
  //   const [estudanteHobbies] = await this.getConnetion().raw(`
  //     SELECT *
  //     FROM ESTUDANTE_HOBBY
  //   `)

  //   return estudanteHobbies
  // }

  async insertDocenteEspecialidade(idDocente:number, idEspecialidade:number): Promise<void> {
    const idTabela = new Date().getTime(); 
    await this.getConnetion().raw(`
      INSERT
      INTO DOCENTE_ESPECIALIDADE (id, docente_id, especialidade_id)
      VALUES (${idTabela}, ${idDocente}, ${idEspecialidade})
    `)
  }
}