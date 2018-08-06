import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Contact} from '../../model/contact';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactsPageComponent } from '../../pages/contacts-page/contacts-page.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
@Input() contact: Contact;
  constructor(private modalService: NgbModal) { }
  @Output()
  edit: EventEmitter<string> = new EventEmitter();
  ngOnInit() {
  }
  editContact() {
    this.edit.emit('edit');
  }
}
