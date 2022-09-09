export default class Docente {
  constructor(
    private idDocente: number,
    private nome: string,
    private email: string,
    private data_nasc: string,
    private turma_id: number,
    private especialidades: string[] = []
  ) { }

  getIdDocente() {
    return this.idDocente
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

  getEspecialidades() {
    return this.especialidades
  }
}