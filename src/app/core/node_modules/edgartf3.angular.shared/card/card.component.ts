import {Component, Input, OnInit} from '@angular/core';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() imageLink: string;
  constructor() { }

  ngOnInit() {

  }

  ExibirImagem(): boolean {
    return !isNullOrUndefined(this.imageLink);
  }


}
