import { Pipe, PipeTransform } from '@angular/core';
import { Link } from '../model/Link';
@Pipe({
  name: 'linkFilter'
})

export class LinkFilterPipe implements PipeTransform {
/*
  transform(value: Link[], args?: any): any {
    /*if (value !== undefined && args[0] !== '') {
    return value.filter(link => link.displayText.toLowerCase().indexOf(args[0].toLowerCase()) !== -1);
    } else {
    return value;
    }
    console.log("-------------------12345678");
    console.log(args[0]);
    return value;
  }*/

  transform(items: any[], searchText: string): any[] {
    if (!items) { return []; }
    if (!searchText) { return items; }

searchText = searchText.toLowerCase();

return items.filter( it => {
      return it.displayText.toLowerCase().includes(searchText);
    });
   }

}
