import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import Item from '../models/item';
@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  private itemsCollection: AngularFirestoreCollection<Item>;
  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Item>('relatorios');

  }


  public buscarRelatorios() {
    return this.itemsCollection.valueChanges();
  }
 
 public addRelatorio(item: Item) {
    this.itemsCollection.add(item).then((resultAdd) => {
      console.log("RESULT ADICIONAR", resultAdd);
    });
  }


}
