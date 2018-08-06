export class Contact {
  _id: number;  
  contactName: string;
  displayName: string;
  voipNum: number;
  skypeNum: number;

  constructor(displayName: string, voipNum: number, skypeNum: number,contactName: string) {    
    this.displayName = displayName;
    this.voipNum = voipNum;
    this.skypeNum = skypeNum;
    this.contactName = contactName;
  }
}
