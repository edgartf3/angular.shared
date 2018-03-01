import {OnInit} from '@angular/core';
import {Acao, TipoDeParametro} from './model/Acao.model';
import {ActivatedRoute} from '@angular/router';
import {ICrudService} from './interfaces/ICrudService';
import {NotificationService} from 'edgartf3.angular.shared/messages/notification.service';
import {IBaseModel} from './interfaces/IBaseModel';
import {isNullOrUndefined} from 'util';

export abstract class BaseCRUDComponent<T extends IBaseModel, F> implements OnInit {
  public actionSelected: Acao;
  public acaoPrincipal: Acao;
  public funcaoParaExecutar: any;
  public Acoes: Acao[] = [];
  public filtroExpandido = false;
  public entidadesSelecionadas: T[] = [];
  private OrdenadoPor: string;
  private MaiorParaMenor: boolean;
  constructor(public activateRoute: ActivatedRoute,
              public service: ICrudService<T, F>,
              public notificationService: NotificationService) { }
  ngOnInit(): void {
    this.MaiorParaMenor = false;
    let codigo = this.activateRoute.snapshot.params['acao'];
    if (isNullOrUndefined(codigo)) {
      codigo = '1';
    }
    this.ConfigurarAcoes();
    for (const acao of this.Acoes) {
      if (acao.codigo === codigo) {
        this.acaoPrincipal = acao;
        break;
      }
    }
    this.actionSelected = this.acaoPrincipal;

  }
  abstract ConfigurarAcoes(): void;
  pesquisar(descricao: F) {
    this.service.Pesquisar(descricao).subscribe((resp: T[]) => {
      this.entidadesSelecionadas = [];
      if (!isNullOrUndefined(this.OrdenadoPor)) {
        this.MaiorParaMenor = !this.MaiorParaMenor;
        this.TitleClick(this.OrdenadoPor);
      }
    });
  }
  ExecutarAcaoSelecionada() {

    if (this.actionSelected.tipoDeParametro === TipoDeParametro.tpArray) {
      if (this.entidadesSelecionadas.length === 0) {
        this.notificationService.AlertBoxInformation('Selecione pelo menos um item');
        return;
      }
    }
    if (this.actionSelected.tipoDeParametro === TipoDeParametro.tpUm) {
      if (this.entidadesSelecionadas.length !== 1) {
        this.notificationService.AlertBoxInformation('Selecione apenas um item');
        return;
      }
    }

    this.funcaoParaExecutar = this.actionSelected.function;
    switch (this.actionSelected.tipoDeParametro) {
      case TipoDeParametro.tpUm:
        this.funcaoParaExecutar(this.entidadesSelecionadas[0]);
        break;
      case TipoDeParametro.tpNenhum:
        this.funcaoParaExecutar();
        break;
      case TipoDeParametro.tpArray:
        this.funcaoParaExecutar(this.entidadesSelecionadas);
        break;
      default:
        this.funcaoParaExecutar(this.entidadesSelecionadas);
        break;
    }
  }
  GetUltimaPesquisa(): T[] {
    return this.service.ultimaPesquisa;
  }
  GetPesquisaInProgress(): boolean {
    return this.service.pesquisaInProgress;
  }
  SetActionSelected(acao: Acao) {
    this.actionSelected = acao;
  }
  expandirFiltro() {
    this.filtroExpandido = !this.filtroExpandido;
  }
  ExecutarAcao(acao: Acao, entity: T) {
    if (isNullOrUndefined(acao)) {
      return;
    }
    if (isNullOrUndefined(entity)) {
      this.notificationService.AlertBoxError('Informe um item para executar a ação "' + acao.caption + '"');
      return;
    }
    this.funcaoParaExecutar = acao.function;
    switch (acao.tipoDeParametro) {
      case TipoDeParametro.tpUm:
        this.funcaoParaExecutar(entity);
        break;
      case TipoDeParametro.tpNenhum:
        this.funcaoParaExecutar();
        break;
      case TipoDeParametro.tpArray:
        this.funcaoParaExecutar([entity]);
        break;
      default:
        this.funcaoParaExecutar([entity]);
        break;
    }
  }
  checkBoxTodos(checked: boolean) {
    this.entidadesSelecionadas = [];
    if (checked) {
      for (const entity of this.service.ultimaPesquisa) {
        this.entidadesSelecionadas.push(entity);
      }
    }
  }
  isChecked(id: string): boolean {
    let result = false;
    for (const x of this.entidadesSelecionadas) {
      if (x.id === id) {
        result = true;
      }
    }
    return result;
  }
  checkBoxClick(entity: T, checked: boolean) {
    if (checked) {
      let jaExiste = false;
      for (let _i = 0; _i < this.entidadesSelecionadas.length; _i++) {
        const num = this.entidadesSelecionadas[_i];
        if (num.id === entity.id) {
          jaExiste = true;
          break;
        }
      }
      if (jaExiste === false) {
        this.entidadesSelecionadas.push(entity);
      }
    } else {
      for (let _i = 0; _i < this.entidadesSelecionadas.length; _i++) {
        const num = this.entidadesSelecionadas[_i];
        if (num.id === entity.id) {
          this.entidadesSelecionadas.splice(_i, 1);
        }
      }
    }
  }
  GetPropertyValue(object: any, propertyName: string) {
    for (const key in object) {
      if (key === propertyName) {
        return object[key];
      }
    }
  }
  hasSorting_desc(column: string) {
    return ((column === this.OrdenadoPor) && (this.MaiorParaMenor === true));
  }
  hasSorting_asc(column: string) {
    return ((column === this.OrdenadoPor) && (this.MaiorParaMenor === false));
  }
  hasSorting(column: string) {
    return (column !== this.OrdenadoPor);
  }
  TitleClick(property: string) {
    // ordenando efetivamente
    let records = this.service.ultimaPesquisa;
    if (this.OrdenadoPor === property) {
      this.MaiorParaMenor = !this.MaiorParaMenor;
    } else {
      this.MaiorParaMenor = false;
    }
    this.OrdenadoPor = property;
    records = records.sort((a, b) => {
      const n1 = this.GetPropertyValue(a, property);
      const n2 = this.GetPropertyValue(b, property);
      if (n1 > n2) {
        if (this.MaiorParaMenor) {
          return -1;
        }
        return 1;
      }

      if (n1 < n2) {
        if (this.MaiorParaMenor) {
          return 1;
        }
        return -1;
      }

      return 0;
    });
  }
}
