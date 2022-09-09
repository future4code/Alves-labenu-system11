import BaseDataBase from "./BaseDataBase";

export default class EstudanteHobbyData extends BaseDataBase {
  // async selectHobby(): Promise<[]> {
  //   const [estudanteHobbies] = await this.getConnetion().raw(`
  //     SELECT *
  //     FROM ESTUDANTE_HOBBY
  //   `)

  //   return estudanteHobbies
  // }

  async insertEstudanteHobby(idEstudante:number, idHobby:number): Promise<void> {
    const idTabela = new Date().getTime(); 
    await this.getConnetion().raw(`
      INSERT
      INTO ESTUDANTE_HOBBY (id, estudante_id, hobby_id)
      VALUES (${idTabela}, ${idEstudante}, ${idHobby})
    `)
  }
}