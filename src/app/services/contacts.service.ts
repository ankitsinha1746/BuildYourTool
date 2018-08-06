import { Injectable } from '@angular/core';
import { Contact } from '../model/contact';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ContactsService {
  private url = 'http://localhost:3000/ContactApi/contact';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }
  getContacts() {
    return new Promise(resolve => {
    this.http.get<Contact[]>(this.url).subscribe((data: Contact[]) => {resolve(data); }, err => {console.log(err); });
  });
  }
  getContact(id: string) {
    return new Promise(resolve => {
      this.http.get<Contact>(this.url + '/' +  id).subscribe((data: Contact) => {resolve(data); }, err => {console.log(err); });
     });
  }

  addContact(contact: Contact) {
    contact.displayName = contact.displayName ? contact.displayName : '-';
    contact.voipNum = contact.voipNum ? contact.voipNum : 0;
    contact.skypeNum = contact.skypeNum ? contact.skypeNum : 0;
    contact.contactName = contact.contactName ? contact.contactName : '-';
    console.log(JSON.stringify(contact)) ;
     return new Promise(resolve => {
      this.http.post<Contact>(this.url, contact).subscribe((data: Contact) => {resolve(data); }, err => {console.log(err); });
     });
  }

  updateContact(contact: Contact) {
    return new Promise(resolve => {
      this.http.put<Contact>(this.url + '/' + contact._id, contact).subscribe(
        (data: Contact) => {resolve(data); }, err => {console.log(err); }
      );
     });
  }
  deleteContact(id: string) {
    return new Promise(resolve => {
      this.http.delete<Contact>(this.url + '/' + id).subscribe((data: Contact) => {resolve(data); }, err => {console.log(err); });
     });
  }

}
