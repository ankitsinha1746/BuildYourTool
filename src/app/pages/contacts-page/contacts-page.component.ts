import { Component, OnInit } from "@angular/core";
import { ContactsService } from "../../services/contacts.service";
import { Contact } from "../../model/contact";
import { FormsModule } from "@angular/forms";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: "app-contacts-page",
  templateUrl: "./contacts-page.component.html",
  styleUrls: ["./contacts-page.component.css"],
  providers: [ContactsService]
})
export class ContactsPageComponent implements OnInit {
  contacts: Contact[];
  // contact: Contact;
  closeResult: string;
  delMul = false;
  editFlag = false;
  contact: Contact = {
    _id: -1,
    displayName: '',
    voipNum: 1,
    skypeNum: 1,
    contactName: ''
  };
  constructor(
    private contactService: ContactsService,
    private modalService: NgbModal
  ) {}
  openAddcontact(content) {
    this.modalService.open(content).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  openEditContact(contact: Contact, content) {
    this.contact = contact;
    this.editFlag = true;
    this.modalService.open(content);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  getContacts() {
    this.contactService.getContacts().then((res: Contact[]) => {
      this.contacts = res;
    });
  }

  ngOnInit() {
    this.getContacts();
  }
  deleteMultiple() {
    console.log(this.delMul);
  }
  /*
  openAddContact() {
    const modalRef = this.modalService.open(ContactModelComponent);
    const Contact1: Contact = new Contact('', 0, 0);
    Contact1._id = this.contacts.length;
    modalRef.componentInstance.Contact = Contact1;
    modalRef.result.then((contact: Contact) => { this.getContacts(); });
  }
  editContact(contact: Contact) {
    const modalRef = this.modalService.open(ContactModelComponent);
    const contact1: Contact = contact;
    contact1._id = this.contacts.length;
    modalRef.componentInstance.contact = contact1;
    modalRef.result.then((contact: Contact) => { this.getContacts(); });
  }*/

  deleteContact(contact: Contact) {
    console.log(contact);
    this.contactService.deleteContact(contact._id + '').then((res: Contact) => {
      this.getContacts();
    });
  }

  saveContact() {
    if (this.editFlag) {
      this.contactService.updateContact(this.contact).then((res: Contact) => {
        this.getContacts();
      });
    }
    else{
    if (this.contacts === undefined) {
      this.contacts = new Contact[0]();
    }
    this.contact._id = this.contacts.length + 1;
    this.contactService.addContact(this.contact).then((res: Contact) => {
      this.getContacts();
    });
  }
}
}
