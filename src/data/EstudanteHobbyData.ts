import BaseDataBase from "./BaseDataBase";

export default class EstudanteHobbyData extends BaseDataBase {
  async insertEstudanteHobby(idEstudante:number, idHobby:number): Promise<void> {
    const idTabela = new Date().getTime() + Math.floor(Math.random() * 1000); 
    await this.getConnetion().raw(`
      INSERT
      INTO ESTUDANTE_HOBBY (id, estudante_id, hobby_id)
      VALUES (${idTabela}, ${idEstudante}, ${idHobby})
    `)
  }
}