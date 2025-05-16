import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../Services/snackbar.service';
import { HomeServiceService } from '../Services/home-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstant } from '../shared/globalConstant';

@Component({
  selector: 'app-home-manage',
  standalone: false,
  templateUrl: './home-manage.component.html',
  styleUrl: './home-manage.component.css'
})
export class HomeManageComponent implements OnInit{
  ngOnInit(): void {
    this.ngx.start();
    this.tableData();
  }
  dataSource:any;
  responseMessage:any;
  constructor(private router:Router,
    private dialog :MatDialog,
    private ngx:NgxUiLoaderService,
    private snackBar : SnackbarService,
    private homeService:HomeServiceService
  ){}
  tableData(){
    this.homeService.getRestau().subscribe((response:any)=>{
      this.ngx.stop();
      this.dataSource = new MatTableDataSource(response);
    },(error)=>{
          this.ngx.stop();
          if(error.error?.message){
            this.responseMessage=GlobalConstant.genericError;
          }
          this.snackBar.openSnackBar(this.responseMessage,'error');
        })
  }
  
handleViewMenu(restaurantId: string) {
  console.log('Attempting to navigate with ID:', restaurantId); 
  this.router.navigate(['/delevry/viewwPlat', restaurantId]);
}

}
