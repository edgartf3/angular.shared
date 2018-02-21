import {isNullOrUndefined} from 'util';

export enum typeOrder {asc, desc, nda}

export enum typeFormat {nda, date, currency, number}

export class Column {
  constructor(title: string, property: string, width?: number, format?: typeFormat) {
    this.title = title;
    this.property = property;
    if (isNullOrUndefined(width)) {
      this.width = 0;
    }else {
      this.width = width;
    }
    this.order = typeOrder.nda;
    if (isNullOrUndefined(format)) {
      this.format = typeFormat.nda;
    } else {
      this.format = format;
    }
  }
  title: string;
  property: string;
  order: typeOrder;
  width: number;
  format: typeFormat;
}
