import { Component, OnInit } from '@angular/core';
import { Stream } from '../stream';
import { Module } from '../module';
import { DataService } from './service/content.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  providers: [DataService]
})
export class ContentComponent implements OnInit {

  status: String;
  selectedStream: Stream;
  today: number;
  isStreamNotSelected: boolean;
  isModuleNotSelected: boolean;
  completed: boolean;
  enableLogsLink: boolean;
  timeElasped: String;
  success: boolean;
  isBuildInProgress: String;
  continuePolling : boolean;
  numberOfPolls: number;
  lastTimeElasped: String;
  showLastbuildTime: boolean;
  showStatusButton: boolean;
  showloader:boolean;
  streams = [
    new Stream('DEV3', 'Development Stream 3 ( DEV3 )'),
    new Stream('DEV4', 'Development Stream 4 ( DEV4 )')
  ];

  selectedModule: Module = new Module('', '');
  modules = [
    //new Module('EDBC', 'Eligibility Determination ( EDBC )'),
    new Module('IN', 'Interfaces ( IN )'),
    // new Module('FO', 'Front Office ( FO )'),
     new Module('BO', 'Back Office ( BO )'),
    // new Module('CO', 'Correspondence ( CO )'),
    // new Module('SP', 'Support Track ( SP )')
  ];

  onSelectStream(streamName) {
    this.selectedStream = null;
    this.isStreamNotSelected = false;
    for (var i = 0; i < this.streams.length; i++) {
      if (streamName == this.streams[i].streamName) {
        this.selectedStream = this.streams[i];
      }
    }
  }

  onSelectModule(moduleName) {
    this.selectedModule = null;
    this.isModuleNotSelected = false;
    for (var i = 0; i < this.modules.length; i++) {
      if (moduleName == this.modules[i].moduleName) {
        this.selectedModule = this.modules[i];
      }
    }
  }

  onSelect() {
    this.isStreamNotSelected = false;
    this.isModuleNotSelected = false;
    this.success=true;
    if (this.selectedStream == null && this.selectedModule == null) {
      this.isStreamNotSelected = true;
      this.isModuleNotSelected = true;
      return;
    }
    if (this.selectedStream == null) {
      this.isStreamNotSelected = true;
      return;
    }
    if (this.selectedModule == null) {
      this.isModuleNotSelected = true;
      return;
    }
    this.completed = false;

    if (!this.isStreamNotSelected && !this.isModuleNotSelected) {
      this.status = "IN PROGRESS";
      this.showStatusButton = true;
      this.showloader =true;
      this.showLastbuildTime = false;
      this.buildService.getItem(this.selectedModule.moduleName, this.selectedStream.streamName).subscribe(
        res => {
          this.status = res.substring(0,1);
         // this.lastTimeElasped = res.toString().trim().substring(2,res.length-1);
          this.enableLogsLink = true;
          if (this.status == "S") {
            this.status = "SUCCESSFUL";
            this.success = true;
            this.resetContainer();
          } else if (this.status == "F"){
            this.status = "FAILED"
            this.success = false;
            this.resetContainer();
          }else if(this.status == "P"){
            this.status = "BUILD ALREADY INITIATED, Please wait ";
            this.showLastbuildTime = false;
            this.completed = false;
            this.showStatusButton = true;
            this.showloader = true;
            this.enableLogsLink = false;
          }
          console.log(res);
        },
        err => {
          this.status = "Invocation FAILED, Please try again or contact administrator."
          this.success = false;
          this.completed = false;
          this.showloader=false;
          this.showStatusButton = true;
          console.log("There is an error : " + err);
        }
      )
    }
  }

  constructor(private buildService: DataService) { }

  ngOnInit() {
    this.status = "Checking for build status. Please wait ";
    this.selectedStream = null;
    this.selectedModule = null;
    this.isStreamNotSelected = false;
    this.isModuleNotSelected = false;
    this.completed = false;
    this.enableLogsLink = false;
    this.success = true;
    this.timeElasped = ""
    this.today = Date.now();
    this.continuePolling = true;
    this.isBuildInProgress="";
    this.numberOfPolls = 0;
    this.showLastbuildTime = false;
    this.showStatusButton = false;
    this.showloader = true;
    this.getCurrentBuildStatus();
  }
   getCurrentBuildStatus() {
    this.success = true;
    this.showStatusButton = false;
    this.showloader = true;
    this.status = "Checking for build status. Please wait ";
    this.numberOfPolls = this.numberOfPolls+1;
    this.buildService.getStatus().subscribe(
      res => {
        this.isBuildInProgress = res.substring(0,1);
        if(this.isBuildInProgress == 'Y'){
            this.continuePolling = true;
            this.resetDefaultValues(this.continuePolling);
        }else{
          this.continuePolling = false;
          this.resetDefaultValues(this.continuePolling);
          this.lastTimeElasped = res.toString().trim().substring(1,res.length);
        }
      },
      err => {
        this.continuePolling = false;
        this.status = "FAILED to obtain build status due to server error. Please try again.";
        this.success = false;
        this.showStatusButton = true;
        this.showloader = false;
        this.enableLogsLink = false;
        console.log("There is an error : " + err);
        return;
      })
  }

  resetDefaultValues(setDefault:boolean){
    if(setDefault){
      this.status = "BUILD IN PROGRESS, Please Wait ";
      this.showLastbuildTime = false;
      this.completed = false;
      this.showStatusButton = true;
    }else{
      this.status = "NOT INITIATED";
      this.showLastbuildTime = true;
      this.completed = true;
      this.showloader=false;
      this.showStatusButton = false;
    }
    
  }
  resetContainer(){
    this.completed = true;
    this.showloader=false;
    this.showStatusButton = false;
  }
 
  setTimetoWaitBeforePolling(timems: number){
      return new Promise( resolve => setTimeout(resolve, timems) );
  }
}
