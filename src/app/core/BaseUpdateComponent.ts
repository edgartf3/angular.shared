import {Component, Injector, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from 'edgartf3.angular.shared/messages/notification.service';
import {RespostaPadrao} from 'edgartf3.angular.shared/Models/RespostaPadrao';
import {IBaseModel} from './interfaces/IBaseModel';
import {ICrudService} from './interfaces/ICrudService';
import {isNullOrUndefined} from 'util';

export class BaseUpdateComponent<T extends IBaseModel, F> implements OnInit {
  public formEntity: FormGroup;
  public router: Router;
  public notificationService: NotificationService;
  public activateRoute: ActivatedRoute;
  constructor(public injector: Injector,
              public service: ICrudService<T, F>,
              public voltarPara: string) {
    this.router = this.injector.get(Router);
    this.notificationService = this.injector.get(NotificationService);
    this.activateRoute = this.injector.get(ActivatedRoute);
    const entity = this.service.NewInstance();
    this.formEntity = this.service.CreateFormGroup(entity);
  }
  ngOnInit() {
    const id = this.activateRoute.snapshot.params['id'];
    if (!isNullOrUndefined(id)) {
      this.service.Get(id).subscribe((resp: T) => {
        this.formEntity = this.service.CreateFormGroup(resp);
      });
    }
  }
  GetUpdateInProgress(): boolean {
    return this.service.updateInProgress;
  }
  GetGetInProgress(): boolean {
    return this.service.getInProgress;
  }
  GetCreateInProgress(): boolean {
    return this.service.createInProgress;
  }
  Update(entity: T) {
    this.service.Update(entity).subscribe((resp: RespostaPadrao) => {
      this.router.navigateByUrl(this.voltarPara);
      this.notificationService.AlertBoxCheck(resp.mensagem);
    });
  }
  Create(entity: T) {
    this.service.Create(entity).subscribe((resp: RespostaPadrao) => {
      this.router.navigateByUrl(this.voltarPara);
      this.notificationService.AlertBoxCheck(resp.mensagem);
    });
  }
  public Voltar() {
    this.router.navigateByUrl(this.voltarPara);
  }
}
