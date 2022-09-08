export default class Estudante {
  constructor(
    private idEstudante: string,
    private nome: string,
    private email: string,
    private data_nasc: string,
    private turma_id: number,
    private hobbie: string[] = []
  ) { }

  getIdEstudante() {
    return this.idEstudante
  }

  getNome() {
    return this.nome
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