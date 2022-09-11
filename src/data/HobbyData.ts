import BaseDataBase from "./BaseDataBase";

export default class HobbyData extends BaseDataBase {
  async selectHobby(): Promise<[]> {
    const [hobbies] = await this.getConnetion().raw(`
      SELECT *
      FROM HOBBY
    `)

    return hobbies
  }

  async selectHobbyById(hobby_id:number): Promise<[]> {
    const [hobby] = await this.getConnetion().raw(`
      SELECT *
      FROM HOBBY
      WHERE (HOBBY.id = ${hobby_id})
    `)

    return hobby
  }

  async insertEstudante(id:number, nome:string): Promise<void> {
    await this.getConnetion().raw(`
      INSERT
      INTO HOBBY (id, nome)
      VALUES (${id}, '${nome}')
    `)
  }
}