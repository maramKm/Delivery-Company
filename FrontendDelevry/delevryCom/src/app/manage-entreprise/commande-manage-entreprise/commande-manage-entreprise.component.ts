/*import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CommandeService } from '../Services/commande.service';
import { SnackbarService } from '../Services/snackbar.service';

@Component({
  selector: 'app-commande-manage-entreprise',
  standalone: false,
  templateUrl: './commande-manage-entreprise.component.html',
  styleUrl: './commande-manage-entreprise.component.css'
})
export class CommandeManageEntrepriseComponent{
  displayedColumns: string[] = ['id', 'date', 'statut', 'total', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  responseMessage: string = '';

  constructor(
    private commandeService: CommandeService,
    private ngx: NgxUiLoaderService,
    private snackBar: SnackbarService
  ) {}


  notifyLivreurs(commandeId: number) {
    this.commandeService.notifyLivreursDisponibles(commandeId).subscribe({
      next: () => {
        this.snackBar.openSnackBar('Livreurs notifiés avec succès', 'success');
      },
      error: () => {
        this.snackBar.openSnackBar('Erreur lors de la notification des livreurs', 'error');
      }
    });
  }

}
*/