export default class Turma {
  private docentes: string[] = [];
  private estudantes: string[] = [];
  private modulo: number = 0;

  constructor(
    private idTurma: number,
    private nome: string,
  ) {}

  getIdTurma() {
    return this.idTurma
  }

  getNome() {
    return this.nome
  }

  getModulo() {
    return this.modulo
  }

  getDocentes() {
    return this.docentes
  }

  getEstudantes() {
    return this.estudantes
  }
}