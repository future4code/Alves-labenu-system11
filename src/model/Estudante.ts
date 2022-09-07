export default class Estudante {
  constructor(
    private idEstudante: number,
    private name: string,
    private email: string,
    private data_nasc: string,
    private turma_id: number,
    private hobbie: number
  ) { }

  getIdEstudante() {
    return this.idEstudante
  }

  getName() {
    return this.name
  }

  getEmail() {
    return this.email
  }

  getData_nasc() {
    return this.data_nasc
  }

  getTurma_id() {
    return this.turma_id
  }

  getHobbie() {
    return this.hobbie
  }
}