import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../model/contact';
@Pipe({
  name: 'contactFilter'
})
export class ContactFilterPipe implements PipeTransform {

  transform(value: Contact[], args?: any): any {
    return value.filter(contact => contact.contactName.toLowerCase().indexOf(args[0].toLowerCase()) !== -1);
  }

}
