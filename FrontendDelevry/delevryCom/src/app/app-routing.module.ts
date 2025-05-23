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
import { LivreurComponent } from './livreur/livreur.component';
import { ClientComponent } from './client/client.component';
import { ListLivreurComponent } from './list-livreur/list-livreur.component';
import { ListDelevryComponent } from './list-delevry/list-delevry.component';
import { ListLivraisonByRestauComponent } from './list-livraison-by-restau/list-livraison-by-restau.component';

const routes: Routes = [
  {
    path: 'delevry',
    component: FullComponent, 
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'platManage', component: PlatManageComponent },
      { path:"homeManage" , component:HomeManageComponent}, 
      { path:"viewwPlat/:restaurantId/:nom" , component:ViewPlatComponent},
      { path:"cart" , component:CardComponent},
      { path:"commande" , component:CommandeManageComponent},
      { path:"restaurantManage" , component:RestaurantEntrepComponent},
      { path:"AssignDelvry" , component:AssignDelevryComponent},
      { path:"livreur" , component:LivreurComponent},
      { path:"client" , component:ClientComponent},
      { path:"GetLivreur" , component:ListLivreurComponent},
      { path:"GetLivraison" , component:ListDelevryComponent},
      { path:"GetLivraisonByRestau" , component:ListLivraisonByRestauComponent},

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
