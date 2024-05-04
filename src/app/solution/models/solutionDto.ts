
export class SolutionDto {
  id : number;
  valeurs : string;

  constructor(solution?: SolutionDto) {
    this.id = solution?.id ?? 0;
    this.valeurs = solution?.valeurs ?? "";
  }
}
