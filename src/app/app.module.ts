import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SplashComponent } from './components/splash/splash.component';
import { SplashScreenStateService } from './services/splash-screen-state.service';
import { HomeResolver } from './resolvers/home.resolver';
import { EditComponent } from './pages/home/edit/edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShareDateService } from './services/share-data.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SplashComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [SplashScreenStateService, HomeResolver, ShareDateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
