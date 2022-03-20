import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { agencyModel } from 'src/app/models/agencias';
import { ListService } from 'src/app/services/list-service';
import { ShareDateService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends ListService implements OnInit {

  myItems = ListService.list;

  constructor(
    injector: Injector,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private shareDataService: ShareDateService
  ) {
    super(injector)
  }

  ngOnInit(): void {
    this.getItem();
  }

  getItem() {
    const itemFromLocalStorage = JSON.parse(localStorage.getItem('list'));
    if (itemFromLocalStorage) {
      this.myItems = itemFromLocalStorage;
      ListService.list = itemFromLocalStorage;
    } else {
      this.activatedRoute.snapshot.data.itemsList
      .subscribe(res => {
         this.myItems = res;
         ListService.list = res;
      })
    }
  }

  editItem(positionItem: number) {
    this.router.navigateByUrl('edit');
    localStorage.setItem('index', JSON.stringify(positionItem));
    this.shareDataService.editedItem(positionItem);
  }

}
