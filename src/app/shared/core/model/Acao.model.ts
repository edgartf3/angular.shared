export enum TipoDeParametro {
  tpNenhum,
  tpUm,
  tpArray
}

export class Acao {
  constructor(Codigo: string, Caption: string, FaIcone: string, Function: any, pTipoDeParametro: TipoDeParametro, ExibirEmAcoes: boolean) {
    this.codigo = Codigo;
    this.caption = Caption;
    this.faIcone = FaIcone;
    this.function = Function;
    this.tipoDeParametro = pTipoDeParametro;
    this.exibirEmAcoes = ExibirEmAcoes;
  }
  codigo: string;
  caption: string;
  faIcone: string;
  function: any;
  tipoDeParametro: TipoDeParametro;
  exibirEmAcoes: boolean;
}
