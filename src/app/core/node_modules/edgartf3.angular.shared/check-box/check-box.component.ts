import {Component, Input, OnInit, Output, ContentChild, AfterContentInit} from '@angular/core';
import {NgModel, FormControlName} from '@angular/forms';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.css']
})
export class CheckBoxComponent implements OnInit {

  @Input() label: string;
  mousedentro: boolean;
  input: any;

  constructor() { }
  ngOnInit() {
  }

  @ContentChild(NgModel) model: NgModel;
  @ContentChild(FormControlName) control: FormControlName;

  ngAfterContentInit() {
    this.input = this.model || this.control
    if (this.input === undefined) {
      throw new Error('Esse componente precisa ser usado com uma diretiva ngModel ou formControlName');
    }
  }

  mouseenter() {
    this.mousedentro = true;
  }

  mouseleave() {
    this.mousedentro = false;
  }

  hasMouseDentro() {
    return this.mousedentro;
  }
  hasChecked(): boolean {
    return this.input.value;
  }

}
