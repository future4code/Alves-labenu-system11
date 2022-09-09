import BaseDataBase from "./BaseDataBase";

export default class EspecialidadeData extends BaseDataBase {
  async selectEspecialidade(): Promise<[]> {
    const [especialidade] = await this.getConnetion().raw(`
      SELECT *
      FROM ESPECIALIDADE
    `)

    return especialidade
  }

  // async insertEstudante(id:number, nome:string): Promise<void> {
  //   await this.getConnetion().raw(`
  //     INSERT
  //     INTO HOBBY (id, nome)
  //     VALUES (${id}, '${nome}')
  //   `)
  // }
}