import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ListService } from 'src/app/services/list-service';
import { ShareDateService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent extends ListService implements OnInit {

  myForm:FormGroup;
  idItem: number

  constructor(
    private shareDataService: ShareDateService,
    private router: Router,
    injector: Injector
  ) {
    super(injector);
    this.myForm = new FormGroup({
      'nombre': new FormControl(null),
      'direccion': new FormControl(null),
      'provincia': new FormControl(null),
      'distrito': new FormControl(null),
      'latitud': new FormControl(null),
      'longitud': new FormControl(null)
    })
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const indexItem = JSON.parse(localStorage.getItem('index'));
    if (indexItem !== '') {
      this.getListItemFromLocalStorage();
      this.idItem = Number(indexItem);
    } else {
      this.shareDataService.editItem$.subscribe(index => {
        this.idItem = Number(index);
      })
    }
    const value = this.listFiltered(this.idItem);
    this.myForm.setValue({
      'nombre': value[0].agencia,
      'provincia': value[0].provincia,
      'direccion': value[0].direccion,
      'distrito': value[0].distrito,
      'latitud': value[0].lat,
      'longitud': value[0].lon,
    })
  }

  itemUpdated() {
    this.updateItem(this.idItem, {
      agencia: this.myForm.get('nombre').value,
      direccion: this.myForm.get('direccion').value,
      provincia: this.myForm.get('provincia').value,
      departamento: this.myForm.get('provincia').value,
      distrito: this.myForm.get('distrito').value,
      lat: this.myForm.get('latitud').value,
      lon: this.myForm.get('longitud').value,
    });
    this.shareDataService.sendItem(this.listItem());
    localStorage.setItem('list', JSON.stringify(this.listItem()));
    this.router.navigateByUrl('homepage');
  }

}
