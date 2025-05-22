import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { NgxUiLoaderConfig, NgxUiLoaderModule } from 'ngx-ui-loader';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuItems } from './shared/menuItems';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FullComponent } from './full/full.component';
import { NavComponent } from './nav/nav.component';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import {MatMenuModule} from '@angular/material/menu';
import { PlatManageComponent } from './plat-manage/plat-manage.component';
import {MatTableModule} from '@angular/material/table';
import { PlatComponent } from './dialog/plat/plat.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HomeManageComponent } from './home-manage/home-manage.component';
import { ViewPlatComponent } from './view-plat/view-plat.component';
import { CardComponent } from './card/card.component';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommandeComponent } from './dialog/commande/commande.component';
import { CommandeManageComponent } from './commande-manage/commande-manage.component';
import { RestaurantEntrepComponent } from './restaurant-entrep/restaurant-entrep.component';
import { AssignDelevryComponent } from './assign-delevry/assign-delevry.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';


const ngxUiLoaderConfig : NgxUiLoaderConfig={
  text:"Loading...",
  textColor: "#E53935",   
  textPosition: "center-center",
  bgsColor: "#E53935",    
  fgsColor: "#E53935", 
  fgsType:'chasing-dots',
  fgsSize:100,
  hasProgressBar:false
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    WelcomeComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    FullComponent,
    NavComponent,
    ConfirmationComponent,
    PlatManageComponent,
    PlatComponent,
    HomeManageComponent,
    ViewPlatComponent,
    CardComponent,
    CommandeComponent,
    CommandeManageComponent,
    RestaurantEntrepComponent,
    AssignDelevryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule,
    MatListModule,
    MatMenuModule,
    MatTableModule,
    MatButtonModule,
    MatTooltipModule,
    FormsModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatPaginatorModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MenuItems],
  bootstrap: [AppComponent]
})
export class AppModule { }
