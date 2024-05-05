
export class SolutionDto {
  id : number;
  valeurs : string;
  statut : boolean;

  constructor(solutionDto?: SolutionDto) {
    this.id = solutionDto?.id ?? 0;
    this.valeurs = solutionDto?.valeurs ?? "";
    this.statut = solutionDto?.statut ?? true;
  }
}
