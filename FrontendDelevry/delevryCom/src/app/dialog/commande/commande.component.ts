import { Component,OnInit } from '@angular/core';
import { Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { FormArray, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-commande',
  standalone: false,
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.css'
})
export class CommandeComponent implements OnInit {
  @Output() onModifyCommande = new EventEmitter<any>();
  commandeForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CommandeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { action: string, data: any },
    private fb: FormBuilder

  ) {
    this.commandeForm = this.fb.group({
      plats: this.fb.array([])
    });
  }

ngOnInit(): void {
  console.log("⚙️ Donnée brute reçue dans MAT_DIALOG_DATA :", this.data);

  const plats = this.data?.data?.plats;
  if (plats && Array.isArray(plats)) {
    plats.forEach((plat: any) => {
      this.plats.push(this.fb.group({
        id: [plat.id],
        nom: [plat.nom],
        quantite: [plat.quantite]
      }));
    });
  } else {
    console.warn("⚠️ Donnée 'plats' absente ou invalide !");
  }
}


  get plats(): FormArray {
    return this.commandeForm.get('plats') as FormArray;
  }

  handleSubmit() {
    this.onModifyCommande.emit(this.commandeForm.value);
    this.dialogRef.close();
  }

  removePlat(index: number) {
    this.plats.removeAt(index);
  }

}