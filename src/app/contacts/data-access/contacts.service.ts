import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Contact, ContactForm } from '../shared/interfaces/contacts.interface';


const PATH = 'contacts';


@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private _firestore = inject(Firestore)

  private _collection = collection(this._firestore, PATH); // ดึง collection ที่จะเก็บ data

  async searchByQuery(name: string) {
    const q = query(
      this._collection,
      where('fullName', '>=', name),
      where('fullName', '<=', name + '\uf8ff'),
    );
    const querySnapshot = await getDocs(q);
    let contacts: Contact[] = [];
    querySnapshot.forEach((doc) => {
      contacts = [...contacts, { id: doc.id, ...doc.data() } as Contact];
    });
    return contacts;
  }


  getContacts() {
    return collectionData(this._collection, {idField: 'id'}) as Observable<Contact[]> 
    // get Document id มาด้วยโดยใช้ {idField: 'id'}
  }

  async getContact(id: string) {
    try {
      const document = doc(this._firestore, PATH, id)
      const snapshot = await getDoc(document)
      // console.log(snapshot);
      return snapshot.data() as ContactForm;
    } catch (error) {
      return undefined;
    }
  }

  createContact(contact: ContactForm) {
    return addDoc(this._collection, contact)
  }

  updateContact(id: string, contact: ContactForm) {
    const document = doc(this._firestore, PATH, id)
    return updateDoc(document, { ...contact })
  }

  deleteContact(id: string) {
    const document = doc(this._firestore, PATH, id)
    return deleteDoc(document)
  }

}


