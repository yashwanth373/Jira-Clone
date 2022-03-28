import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projectboard',
  templateUrl: './projectboard.component.html',
  styleUrls: ['./projectboard.component.css']
})
export class ProjectboardComponent implements OnInit {

  constructor(private router : Router) { }

  searchQuery: string = '';

  groupByOption : string = 'None';

  activeSprint : any;

  project : any = {
    project_id : "346345345",
    project_name : "Dummy 5",
    key : "DM5",
    createdAt : "324234324234",
    owner : {
      user_id : "345345345",
      name : "Yashwanth Reddy",
      img : "dfgdfgdfg"
    },
    members : [
      {
        user_id : "345345345",
        name : "Yashwanth 2",
        email : "sdfsdfsdff",
        img : "sdfsdsffd"
      },
      {
        user_id : "345345346",
        name : "Yashwanth 3",
        email : "sdfsdfsdff",
        img : "sdfsdsffd"
      },
      {
        user_id : "345345347",
        name : "Yashwanth 4",
        email : "sdfsdfsdff",
        img : "sdfsdsffd"
      }
    ],
    sprint : [
      {
        sprint_id : "345345345",
        sprint_name : "Sprint 2",
        started : true,
        completed : false,
        duration : 3,
        startDate : "1648319400000",
        endDate : "1650220200000",
        goal : "sdfdsfdsffsdf",
        issues : ["1221","1222","1224","1226"],
        backlog : ["1223","12225"]
      },
      {
        sprint_id : "345345345",
        sprint_name : "Sprint 1",
        started : true,
        completed : true,
        duration : 3,
        startDate : "324234324234",
        endDate : "324234324234",
        goal : "sdfdsfdsffsdf",
        issues : ["1218","1219","1220"],
        backlog : ["1221"]
      }
    ],
    issues : [
      {
        issue_id : "1218",
        tag : "DM5-1",
        name : "sdfsdfdf",
        type : "issue",
        attachment : "sdfdsfdf",
        description : "sdfsdfsdf",
        priority : "High",
        status : "in progress",
        sprint : "32534534",
        epic : "4567456",
        dueDate : "356456456"
      },
      {
        issue_id : "1219",
        tag : "DM5-1",
        name : "sdfsdfdf",
        type : "issue",
        attachment : "sdfdsfdf",
        description : "sdfsdfsdf",
        priority : "High",
        status : "done",
        sprint : "32534534",
        epic : "4567456",
        dueDate : "356456456"
      },
      {
        issue_id : "1220",
        tag : "DM5-1",
        name : "sdfsdfdf",
        type : "issue",
        attachment : "sdfdsfdf",
        description : "sdfsdfsdf",
        priority : "High",
        status : "done",
        sprint : "32534534",
        epic : "4567456",
        dueDate : "356456456"
      },
      {
        issue_id : "1221",
        tag : "DM5-1",
        name : "sdfsdfdf",
        type : "issue",
        attachment : "sdfdsfdf",
        description : "sdfsdfsdf",
        priority : "High",
        status : "done",
        sprint : "32534534",
        epic : "4567456",
        dueDate : "356456456"
      },
      {
        issue_id : "1222",
        tag : "DM5-1",
        name : "sdfsdfdf",
        type : "issue",
        attachment : "sdfdsfdf",
        description : "sdfsdfsdf",
        priority : "High",
        status : "in progress",
        sprint : "32534534",
        epic : "4567456",
        dueDate : "356456456"
      },
      {
        issue_id : "1223",
        tag : "DM5-1",
        name : "sdfsdfdf",
        type : "issue",
        attachment : "sdfdsfdf",
        description : "sdfsdfsdf",
        priority : "High",
        status : "in progress",
        sprint : "32534534",
        epic : "4567456",
        dueDate : "356456456"
      },
      {
        issue_id : "1224",
        tag : "DM5-1",
        name : "sdfsdfdf",
        type : "issue",
        attachment : "sdfdsfdf",
        description : "sdfsdfsdf",
        priority : "High",
        status : "to do",
        sprint : "32534534",
        epic : "4567456",
        dueDate : "356456456"
      },
      {
        issue_id : "1225",
        tag : "DM5-1",
        name : "sdfsdfdf",
        type : "issue",
        attachment : "sdfdsfdf",
        description : "sdfsdfsdf",
        priority : "High",
        status : "to do",
        sprint : "32534534",
        epic : "4567456",
        dueDate : "356456456"
      },
      {
        issue_id : "1226",
        tag : "DM5-1",
        name : "sdfsdfdf",
        type : "issue",
        attachment : "sdfdsfdf",
        description : "sdfsdfsdf",
        priority : "High",
        status : "to do",
        sprint : "32534534",
        epic : "4567456",
        dueDate : "356456456"
      },
    ],
    board : ["to do", "in progress", "done"],
    icon : "sdfsdfdf",
    code : {
      owner_id : "345345345",
      repo_name : "sdfsdfsdf"
    },
    invited : ["sdfsdfsdf","sdfsdfsdfdf","sdfsdfsdf"],
    modifiedAt : "324234324234"

  }

  ngOnInit(): void {

    this.prepareActiveSprint();
    console.log(this.activeSprint)
  }

  prepareActiveSprint(){

    // Selecting Active Sprint from all sprints
    for(var i = 0; i < this.project.sprint.length; i++){
      if(this.project.sprint[i].started == true && this.project.sprint[i].completed == false){
        this.activeSprint = this.project.sprint[i];
        let now = new Date();
        let startOfDay : any = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        let timestamp = startOfDay / 1;
        this.activeSprint.remainingTime = (this.activeSprint.endDate -  timestamp)/(1000*60*60*24);
      }
    }

    //Preparing empty status arrays in activeSprint object
    for(let section of this.project.board){
      this.activeSprint[section] = [];
    }

    // Arranging issues in the active sprint according to their statuses
    for(var i = 0; i < this.activeSprint.issues.length; i++){
      let issue = this.project.issues.filter((issue : any) => issue.issue_id === this.activeSprint.issues[i])[0];
      this.activeSprint[issue.status].push(issue);
    }
  }

  changeGroupBy(option: string) {
    this.groupByOption = option;
  }

}
