import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './full/full.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PlatManageComponent } from './plat-manage/plat-manage.component';
import { HomeManageComponent } from './home-manage/home-manage.component';
import { ViewPlatComponent } from './view-plat/view-plat.component';
import { CardComponent } from './card/card.component';
import { CommandeManageComponent } from './commande-manage/commande-manage.component';
import { RestaurantEntrepComponent } from './restaurant-entrep/restaurant-entrep.component';
import { AssignDelevryComponent } from './assign-delevry/assign-delevry.component';

const routes: Routes = [
  {
    path: 'delevry',
    component: FullComponent, 
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'platManage', component: PlatManageComponent },
      { path:"homeManage" , component:HomeManageComponent}, 
      { path:"viewwPlat/:restaurantId" , component:ViewPlatComponent},
      { path:"cart" , component:CardComponent},
      { path:"commande" , component:CommandeManageComponent},
      { path:"restaurantManage" , component:RestaurantEntrepComponent},
      { path:"AssignDelvry" , component:AssignDelevryComponent},

    ]
  },
  {
    path:'welcome',component:WelcomeComponent
  },
  { path: '**', redirectTo: '' }  // Route par défaut pour les chemins non définis
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
