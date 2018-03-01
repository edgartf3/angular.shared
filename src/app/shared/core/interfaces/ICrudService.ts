import {Observable} from 'rxjs/Observable';
import {IBaseModel} from './IBaseModel';
import {RespostaPadrao} from '../../Models/RespostaPadrao';
import {FormGroup} from '@angular/forms';

export interface ICrudService<T extends IBaseModel, F> {
  ultimaPesquisa: T[];
  pesquisaInProgress: boolean;
  updateInProgress: boolean;
  createInProgress: boolean;
  getInProgress: boolean;
  deleteInProgress: boolean;
  Pesquisar(parametro: F): Observable<T[]>;
  Delete_Multiplos(ids: String[]): Observable<RespostaPadrao>;
  Delete(id: String): Observable<RespostaPadrao>;
  Get(id: string): Observable<T>;
  Create(entity: T): Observable<RespostaPadrao>;
  Update(entity: T): Observable<RespostaPadrao>;
  CreateFormGroup(entity: T): FormGroup;
  NewInstance(): T;
}
