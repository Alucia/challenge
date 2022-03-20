import { Component, Injector, OnInit } from "@angular/core";
import { IAgency } from "../models/agencias";
import { Agency } from "./agency";
import { ShareDateService } from "./share-data.service";
import { agencias } from '../data/agencias.json';

@Component({
  template: ''
})
export class ListService extends ShareDateService implements OnInit {
  public static list: Agency[] = [];
  public static item: Agency = new Agency('', '', '', '', '', 0, 0);
  instance: any;

  constructor(public injector: Injector) {
    super();
  }

  ngOnInit(): void {
    // console.log(this)
  }

  listItem() {
    return ListService.list;
  }

  getListItemFromLocalStorage() {
    const itemFromLocalStorage = JSON.parse(localStorage.getItem('list'));
    if (itemFromLocalStorage) {
      ListService.list = itemFromLocalStorage;
    }
    return ListService.list;
  }

  listFiltered(index: number): Agency[] {
    const list = ListService.list.filter((val, i) => {
      return i === index;
    });
    return list;
  }

  updateItem(idTask: number, item: IAgency): Agency[] {
    const editedItem = new Agency(
      item.agencia,
      item.distrito,
      item.provincia,
      item.departamento,
      item.direccion,
      item.lat,
      item.lon
      );
    ListService.list[idTask] = editedItem;
    return ListService.list;
  }
}
