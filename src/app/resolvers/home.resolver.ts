import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SplashScreenStateService } from '../services/splash-screen-state.service';
import { agencias } from '../data/agencias.json';
import { ListService } from '../services/list-service';

@Injectable()
export class HomeResolver extends ListService implements Resolve<any> {

  constructor(
    injector: Injector,
    private splashScreenStateService: SplashScreenStateService
  ) {
    super(injector);
  }
  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<Observable<any>>
  {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.splashScreenStateService.stop();
          resolve(of(agencias));
        }, 1000);
    });
  }
}
