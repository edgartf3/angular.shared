import {NgModule, ModuleWithProviders} from '@angular/core';
import {AlertBoxComponent} from './messages/alert-box/alert-box.component';
import {ModalCancelaConfirmaComponent} from './messages/modal-cancela-confirma/modal-cancela-confirma.component';
import {SnackbarComponent} from './messages/snackbar/snackbar.component';
import {ModalService} from './messages/modal.service';
import {NotificationService} from './messages/notification.service';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {BuscaCepService} from './BuscaCep/BuscaCep.service';
import {CardComponent} from './card/card.component';
import {CheckBoxComponent} from './check-box/check-box.component';
import {DatatableComponent} from './datatable/datatable.component';
import {RouterModule} from '@angular/router';
import {InputComponent} from './input/input.component';

@NgModule({
  declarations: [
    InputComponent,
    DatatableComponent,
    CheckBoxComponent,
    CardComponent,
    AlertBoxComponent,
    SnackbarComponent,
    ModalCancelaConfirmaComponent],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule
  ],
  exports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CardComponent,
    CheckBoxComponent,
    DatatableComponent,
    InputComponent,
    AlertBoxComponent,
    SnackbarComponent,
    ModalCancelaConfirmaComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [NotificationService, ModalService, BuscaCepService]
    };
  }
}
