import { Injectable } from '@angular/core';
import { Link } from '../model/Link';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LinkService {
  private url = 'http://localhost:3000/LinkApi/link';
  constructor(private httpc: HttpClient) { }
  getLinks() {
    return new Promise(resolve => {
   this.httpc.get<Link[]>(this.url).subscribe((data: Link[]) => {resolve(data); }, err => {console.log(err); });
    });
  }
  getLink(id: string) {
    return new Promise(resolve => {
      this.httpc.get<Link>(this.url + '/' +  id).subscribe((data: Link) => {resolve(data); }, err => {console.log(err); });
     });
  }
  addLink(link: Link) {
    console.log(link);
    link.description = link.description ? link.description : '-';
    link.displayText = link.displayText ? link.displayText : '-';
    link.tooltipText = link.tooltipText ? link.tooltipText : '-';
     return new Promise(resolve => {
      this.httpc.post<Link>(this.url, link).subscribe((data: Link) => {resolve(data); }, err => {console.log(err); });
     });
  }
  updateLink(link: Link) {

    return new Promise(resolve => {
      this.httpc.put<Link>(this.url + '/' + link._id, link).subscribe((data: Link) => {resolve(data); }, err => {console.log(err); });
     });
  }
  deleteLink(id: string) {
    return new Promise(resolve => {
      this.httpc.delete<Link>(this.url + '/' + id).subscribe((data: Link) => {resolve(data); }, err => {console.log(err); });
     });
  }
}
