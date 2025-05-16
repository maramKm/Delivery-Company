import { AfterViewInit, Component } from '@angular/core';
import { DashbordService } from '../Services/dashbord.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../Services/snackbar.service';
import { GlobalConstant } from '../shared/globalConstant';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit{

  responseMessage:any;
  data:any;
  ngAfterViewInit(): void {
  }
  constructor(private dashboardService:DashbordService,
    private ngxService:NgxUiLoaderService,
    private snackBar:SnackbarService
  ){
    this.ngxService.start();
    this.dashboardData();
  }
  dashboardData(){
    this.dashboardService.getDetails().subscribe((response:any)=>{
      this.ngxService.stop();
      this.data = response;
    },(error)=>{
          this.ngxService.stop();
          if(error.error?.message){
            this.responseMessage=GlobalConstant.genericError;
          }
          this.snackBar.openSnackBar(this.responseMessage,'error');
        })
  }

}
