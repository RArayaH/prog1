import { Injectable } from '@angular/core';
import { collectionData, docData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, updateDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';

export interface Note {
  id?: string;
  title: string;
  text: string;
}

export interface Ubic {
  id?: string;
  coordenadas:string;
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor( private firestore: Firestore) { }

  getNotes(): Observable<Note[]>{
    const notesRef = collection(this.firestore, 'notes');
    return collectionData(notesRef, {idField: 'id'}) as Observable<Note[]>;
  }

  getNoteById(id): Observable<Note>{
    const noteDocRef = doc(this.firestore, `notes/${id}`);
    return docData(noteDocRef, {idField: 'id'}) as Observable<Note>;
  }

  addNote(note:Note){
    const notesRef = collection(this.firestore, 'notes');
    return addDoc(notesRef, note)
  }

  addUbicacion(ubic:Ubic){
    const notesRef = collection(this.firestore, 'ubicacion');
    return addDoc(notesRef, ubic)
  }

  deleteNote(note:Note){
    const noteDocRef = doc(this.firestore, `notes/${note.id}`);
    return deleteDoc(noteDocRef)
  }

  updateNote(note:Note){
    const noteDocRef = doc(this.firestore, `notes/${note.id}`);
    return updateDoc(noteDocRef, {title: note.title, text: note.text})
  }



  
  

  
}
