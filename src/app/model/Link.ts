export class Link {
  _id:number;
    link: string;
    description: string;
    tooltipText: string;
    displayText: string;

    
  constructor(link:string,description:string,tooltipText:string,displayText:string){
    this.link = link;
    this.description = description;
    this.tooltipText = tooltipText;
    this.displayText = displayText;
  }
}