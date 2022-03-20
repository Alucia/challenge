import { Component, OnInit } from '@angular/core';
import { SplashScreenStateService } from 'src/app/services/splash-screen-state.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {

  public showSplash = true;

  constructor(
    private splashScreenStateService: SplashScreenStateService
  ) { }


  ngOnInit(): void {
    this.hideSplash();
  }

  hideSplash(): void {
    this.splashScreenStateService.subscribe(res => {
      this.showSplash = res;
    });
  }
}
