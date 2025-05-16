import { Component, OnInit } from '@angular/core';
import { PlatService } from '../Services/plat.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { GlobalConstant } from '../shared/globalConstant';
import { SnackbarService } from '../Services/snackbar.service';
import { PlatComponent } from '../dialog/plat/plat.component';

@Component({
  selector: 'app-plat-manage',
  standalone: false,
  templateUrl: './plat-manage.component.html',
  styleUrl: './plat-manage.component.css'
})
export class PlatManageComponent implements OnInit{
  displayedColumns: string[] = ['name', 'description', 'prix', 'image', 'edit'];
  dataSource:any;
  responseMessage:any;
  ngOnInit(): void {
    
    this.ngx.start();
    this.tableData();
  }

  constructor(private platService:PlatService,
    private dialog :MatDialog,
    private ngx:NgxUiLoaderService,
    private snackBar : SnackbarService,
    private router:Router
  ){}
  

  tableData(){
    
    this.platService.getAllPlats().subscribe((response:any)=>{
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

  applyFilter(event:Event){
    const filterValue=(event.target as HTMLInputElement).value;
    this.dataSource.filter=filterValue.trim().toLowerCase();
  }
  /*getImageUrl(imagePath: string): string {
    return `http://localhost:8081/${imagePath}`;
  }  */
  handleAddAction(){
    const dialongConfig=new MatDialogConfig();
    dialongConfig.data={
      action:"Add"
    };
    dialongConfig.width="850px";
    const dialogRef = this.dialog.open(PlatComponent,dialongConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddPlat.subscribe(()=>{
      this.tableData();
    });
  }
  handleEditAction(plat: any) {
    console.log('Plat being passed to dialog:', plat);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data: plat // Plat à éditer
    };
    const dialogRef = this.dialog.open(PlatComponent, dialogConfig);
  
    dialogRef.componentInstance.onAddPlat.subscribe(() => {
      this.tableData();  // Rafraîchit les plats dans la liste
    });
  }
  


}
