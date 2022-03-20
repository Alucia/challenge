import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Agency } from './agency';


@Injectable({
  providedIn: 'root',
})
export class ShareDateService {

  private editItemSubject = new BehaviorSubject<number>(null);;
  editItem$ = this.editItemSubject.asObservable();

  private sendItemSubject = new BehaviorSubject<Agency[]>(null);;
  sendItem$ = this.sendItemSubject.asObservable();

  editedItem(item: number) {
    this.editItemSubject.next(item);
  }

  sendItem(item: Agency[]) {
    this.sendItemSubject.next(item);
  }
}
