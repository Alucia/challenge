import { Component, Injector, OnInit } from "@angular/core";
import { IAgency } from "../models/agencias";
import { Agency } from "./agency";
import { ShareDateService } from "./share-data.service";
import { agencias } from '../data/agencias.json';
import { Marker } from "../models/marker.interface";
declare var google;

@Component({
  template: ''
})
export class ListService extends ShareDateService implements OnInit {
  public static list: Agency[] = [];
  public static item: Agency = new Agency('', '', '', '', '', 0, 0);
  instance: any;
  map = null;
  markers = agencias.map((item) => {
    return {
      position: {
        lat: item.lat,
        lng: item.lon,
      },
      title: item.agencia
    }
  });

  constructor(public injector: Injector) {
    super();
  }

  ngOnInit(): void {
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

  loadMap() {
    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD8PpFZDE1ut1SZ7wMJS4PUPewKl4aBPhc';
    document.getElementsByTagName('body')[0].appendChild(scriptElement);

    scriptElement.onload = () => {
      this.renderMap();
    };
  }

  renderMap() {
    const createDiv = document.createElement('div');
      document.getElementById('divMap').appendChild(createDiv);
      createDiv.setAttribute('id', 'map');
      const mapEle: HTMLElement = document.getElementById('map');

      // create LatLng object
      const myLatLng = {lat: -71.530671000, lng: -3.731367};
      // create map
      this.map = new google.maps.Map(mapEle, {
        center: myLatLng,
        zoom: 2
      });

      google.maps.event.addListenerOnce(this.map, 'idle', () => {
        this.renderMarkers();
        mapEle.classList.add('show-map');
      });
  }

  renderMarkers() {
    this.markers.forEach(marker => {
      this.addMarker(marker);
    });
  }

  addMarker(marker: Marker) {
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title
    });
  }
}
