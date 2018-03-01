import {Component, Injector, Input, OnInit} from '@angular/core';
import {Column, typeFormat, typeOrder} from './columns';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {
  @Input() columns: Column[];
  @Input() records: any[];
  @Input() deleteFunction: any;
  @Input() printFunction: any;
  @Input() exibirAcoes: boolean;
  constructor(private injector: Injector) {
    this.exibirAcoes = true;
    this.deleteFunction = null;
  }

  ngOnInit() {

  }

  hasSorting_desc(column: Column) {
    return (column.order === typeOrder.desc);
  }

  hasSorting_asc(column: Column) {
    return (column.order === typeOrder.asc);
  }

  hasSorting(column: Column) {
    return (column.order === typeOrder.nda);
  }

  onTitleClick(column: Column) {
    console.log(column);
    if (column.order === typeOrder.nda) {
      column.order = typeOrder.asc;
    }else if (column.order === typeOrder.asc) {
      column.order = typeOrder.desc;
    }else if (column.order === typeOrder.desc) {
      column.order = typeOrder.asc;
    }

    for (let i = 0; i < this.columns.length; i++) {
      if (this.columns[i].property !== column.property) {
        this.columns[i].order = typeOrder.nda;
      }
    }
    // ordenando efetivamente
    this.records = this.records.sort((a, b) => {
      const n1 = this.GetPropertyValue(a, column.property);
      const n2 = this.GetPropertyValue(b, column.property);
      if (n1 > n2) {
        if (column.order === typeOrder.desc) {
          return -1;
        }
        return 1;
      }

      if (n1 < n2) {
        if (column.order === typeOrder.desc) {
          return 1;
        }
        return -1;
      }

      return 0;
    });
  }

  GetPropertyValue(object: any, propertyName: string) {
    for (const key in object) {
      if (key === propertyName) {
        return object[key];
      }
    }
  }

  Exluir(record: any) {
    if (!isNullOrUndefined(this.deleteFunction)) {
      this.deleteFunction(record, this.records, this.injector);
    }
  }

  isDateFormat(column: Column) {
    return (column.format === typeFormat.date);
  }

  isCurrencyFormat(column: Column) {
    return (column.format === typeFormat.currency);
  }
  isNumberFormat(column: Column) {
    return (column.format === typeFormat.number);
  }

  isNdaFormat(column: Column) {
    return (column.format === typeFormat.nda);
  }

  Imprimir(record: any) {
    if (!isNullOrUndefined(this.printFunction)) {
      this.printFunction(record, this.injector);
    }
  }
}
