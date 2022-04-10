import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {CdkDragDrop, CDK_DRAG_CONFIG, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import * as _moment from 'moment';
import { DataService } from '../data.service';

const moment = _moment;

const DragConfig = {
  dragStartThreshold: 0,
  pointerDirectionChangeThreshold: 5,
  zIndex: 10000
};

export const MY_FORMATS = {
  parse: {
    dateInput: 'L',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'L',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-projectboard',
  templateUrl: './projectboard.component.html',
  styleUrls: ['./projectboard.component.css'],
  providers: [{ provide: CDK_DRAG_CONFIG, useValue: DragConfig },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },]
})
export class ProjectboardComponent implements OnInit {

  constructor(private router : Router, private _dsService : DataService, private route : ActivatedRoute) { }

  dummy_project : any = {
    project_id : "346345345",
    project_name : "Dummy 5",
    project_key : "DM5",
    createdAt : "324234324234",
    owner : {
      user_id : "345345345",
      name : "Yashwanth Reddy",
      img : "dfgdfgdfg",
      dummy_img : "YR",
      email : "sdfdsfdsf"
    },
    members : [
      {
        user_id : "1",
        name : "Yashwanth 2",
        email : "sdfsdfsdff",
        img : null,
        dummy_img : "Y"
      },
      {
        user_id : "2",
        name : "Yashwanth 3",
        email : "sdfsdfsdff",
        img : "sdfsdsffd"
      },
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
    epics : [
      {
        epic_id : "345345345",
        tag : "DM5-1",
        name : "Backend",
        issues : ["1221","1222","1220"],
        startDate: "25324534535",
        endDate : "345345345",
        priority : "High",
        priority_icon : "../../assets/issue-priority-high.svg",
        Reporter : "45345346",
        description : "sdfdsfdsfdsffd",
        createdAt : "346546546"
      },
      {
        epic_id : "345345345",
        tag : "DM5-1",
        name : "Frontend",
        issues : ["1218","1219"],
        startDate: "25324534535",
        endDate : "345345345",
        priority : "High",
        Reporter : "45345346",
        description : "sdfdsfdsfdsffd",
        createdAt : "346546546"
      }
    ],
    issues : [
      {
        issue_id : "1218",
        tag : "DM5-1",
        name : "Abstract",
        type : "story",
        type_icon : "../../assets/issue-type-story.svg",
        createdAt:"1648356780000",
        attachment : "sdfdsfdf",
        description : "sdfsdfsdf",
        priority : "High",
        priority_icon : "../../assets/issue-priority-high.svg",
        status : "in progress",
        sprint : {
          sprint_id : "345345345",
          sprint_name : "Sprint 2",
        },
        epic : null,
        dueDate : "1648837800000",
        assignee : {
          user_id : "1",
          name : "Yashwanth Reddy",
          img : null,
          dummy_img : "YR"
        },
        reporter :{
          user_id : "2",
          name : "Rakesh Gigachad",
          img : "dfgdfgdfg",
          dummy_img : "RG"
        },
        modifiedAt : "1648647309625",
      },
      {
        issue_id : "1219",
        tag : "DM5-2",
        name : "Drafting Abstract",
        type : "story",
        type_icon : "../../assets/issue-type-story.svg",
        createdAt:"1648356790000",
        attachment : "sdfdsfdf",
        description : "sdfsdfsdf",
        priority : "High",
        priority_icon : "../../assets/issue-priority-high.svg",
        status : "in progress",
        sprint : "32534534",
        epic : "4567456",
        dueDate : "1648837900000",
        assignee : {
          user_id : "345345345",
          name : "Yashwanth Reddy",
          img : "dfgdfgdfg"
        },
        reporter : "345345345",
        modifiedAt : "1648647309624",
        icon : "../../assets/issue-type-story.svg"
      },
      {
        issue_id : "1220",
        tag : "DM5-3",
        name : "Design",
        type : "task",
        type_icon : "../../assets/issue-type-task.svg",
        createdAt:"1648356800000",
        attachment : "sdfdsfdf",
        description : "sdfsdfsdf",
        priority : "High",
        priority_icon : "../../assets/issue-priority-high.svg",
        status : "in progress",
        sprint : {
          sprint_id : "345345345",
          sprint_name : "Sprint 2",
        },
        epic : {
          epic_id : "345345345",
          name : "Backend",
        },
        dueDate : "1648838000000",
        assignee : {
          user_id : "1",
          name : "Yashwanth Reddy",
          img : "dfgdfgdfg"
        },
        reporter : "345345345",
        modifiedAt : "1648647309623",
      },
      {
        issue_id : "1221",
        tag : "DM5-4",
        name : "Architecture",
        type : "task",
        type_icon : "../../assets/issue-type-task.svg",
        createdAt:"1648359000000",
        attachment : "sdfdsfdf",
        description : "sdfsdfsdf",
        priority : "Low",
        priority_icon : "../../assets/issue-priority-low.svg",
        development : null,
        status : "in progress",
        sprint : {
          sprint_id : "345345345",
          sprint_name : "Sprint 2",
        },
        epic : {
          epic_id : "345345345",
          name : "Backend",
        },
        dueDate : "1648838100000",
        assignee : {
          user_id : "1",
          name : "Yashwanth Reddy",
          img : null,
          dummy_img : "YR"
        },
        reporter :{
          user_id : "2",
          name : "Rakesh Gigachad",
          img : "dfgdfgdfg",
          dummy_img : "RG"
        },
        modifiedAt : "1648647309622",
      },
      {
        issue_id : "1222",
        tag : "DM5-5",
        name : "Implementation",
        type : "story",
        type_icon : "../../assets/issue-type-story.svg",
        createdAt:"1648359100000",
        attachment : "sdfdsfdf",
        description : "sdfsdfsdf",
        priority : "Medium",
        priority_icon : "../../assets/issue-priority-medium.svg",
        development : null,
        status : "in progress",
        sprint : {
          sprint_id : "345345345",
          sprint_name : "Sprint 2",
        },
        epic : {
          epic_id : "345345345",
          name : "Backend",
        },
        dueDate : "1648838200000",
        assignee : {
          user_id : "2",
          name : "Rakesh Gigachad",
          img : null,
          dummy_img : "RG"
        },
        reporter : {
          user_id : "1",
          name : "Yashwanth Reddy",
          img : "dfgdfgdfg",
          dummy_img : "YR"
        },
        modifiedAt : "1648647309621",
      },
      {
        issue_id : "1223",
        tag : "DM5-6",
        name : "Modal display bug",
        type : "bug",
        type_icon : "../../assets/issue-type-bug.svg",
        createdAt:"1648359200000",
        attachment : "sdfdsfdf",
        description : "sdfsdfsdf",
        priority : "High",
        priority_icon : "../../assets/issue-priority-high.svg",
        status : "in progress",
        sprint : "32534534",
        epic : "4567456",
        dueDate : "1648838300000",
        assignee : {
          user_id : "345345345",
          name : "Yashwanth Reddy",
          img : "dfgdfgdfg"
        },
        reporter : "345345345",
        modifiedAt : "1648647309620",
      },
      {
        issue_id : "1224",
        tag : "DM5-7",
        name : "Side nav bug",
        type : "bug",
        type_icon : "../../assets/issue-type-bug.svg",
        createdAt:"1648359300000",
        attachment : "sdfdsfdf",
        description : "sdfsdfsdf",
        priority : "Low",
        priority_icon : "../../assets/issue-priority-low.svg",
        development : {
          branch_id : "3245354",
          branch_name: "main",
        },
        status : "in progress",
        sprint : {
          sprint_id : "345345345",
          sprint_name : "Sprint 2",
        },
        epic : null,
        dueDate : "1648838400000",
        assignee : {
          user_id : "1",
          name : "Yashwanth Reddy",
          img : null,
          dummy_img : "YR"
        },
        reporter :{
          user_id : "2",
          name : "Rakesh Gigachad",
          img : "dfgdfgdfg",
          dummy_img : "RG"
        },
        modifiedAt : "1648647309619",
      },
      {
        issue_id : "1225",
        tag : "DM5-8",
        name : "Routing bug",
        type : "bug",
        type_icon : "../../assets/issue-type-bug.svg",
        createdAt : "1648359400000",
        attachment : "sdfdsfdf",
        description : "sdfsdfsdf",
        priority : "High",
        priority_icon : "../../assets/issue-priority-high.svg",
        status : "in progress",
        sprint : "32534534",
        epic : "4567456",
        dueDate : "1648838500000",
        assignee : {
          user_id : "345345345",
          name : "Yashwanth Reddy",
          img : "dfgdfgdfg"
        },
        reporter : "345345345",
        modifiedAt : "1648647309618",
      },
      {
        issue_id : "1226",
        tag : "DM5-9",
        name : "Create user backend bug",
        type : "bug",
        type_icon : "../../assets/issue-type-bug.svg",
        createdAt:"1648359500000",
        attachment : "sdfdsfdf",
        description : "sdfsdfsdf",
        priority : "High",
        priority_icon : "../../assets/issue-priority-high.svg",
        development : {
          branch_id : "3245354",
          branch_name: "main",
        },
        status : "in progress",
        sprint : {
          sprint_id : "345345345",
          sprint_name : "Sprint 2",
        },
        epic : null,
        dueDate : "1648838600000",
        assignee : {
          user_id : "2",
          name : "Rakesh Gigachad",
          img : null,
          dummy_img : "RG"
        },
        reporter : {
          user_id : "345345345",
          name : "Yashwanth Reddy",
          img : "dfgdfgdfg",
          dummy_img : "YR"
        },
        modifiedAt : "1648647309617",
      },
    ],
    board : ["to do", "in progress", "done"],
    icon : "sdfsdfdf",
    code : {
      owner_id : "345345345",
      repo_name : "sdfsdfsdf"
    },
    invited : ["sdfsdfsdf","sdfsdfsdfdf","sdfsdfsdf"],
    modifiedAt : "324234324234",
    isOwner : true,
  }
  
  project : any = null;

  searchQuery: string = '';

  groupByOption : string = 'None';

  activeSprint : any = null;

  connections : any = []

  newSectionName : any = null;

  stagingArea : any = [];

  @ViewChild('close') closebtn : ElementRef | undefined;

  @ViewChild('closeIssueModal') closeIssueModalbtn : ElementRef | undefined;
  
  sectionNamePlaceholder : any = "Section Name"

  fromSection : any = null

  toSection : any = null

  updateIssueStatus : any = null

  selectedIssue : any = null;

  updatedSelectedIssue : any = null;

  editIssue : boolean = false;

  updatedSelectedIssueDueDate : any = null;

  madeUpdates : boolean = false;

  ngOnInit(): void {

    let projectId = this.route.snapshot.paramMap.get('projectId');
    console.log("board project id",this.route)


    this._dsService.getProjectDetails(projectId).subscribe((data : any) => {
      console.log("board api call",data)
      this.project = data.data;
      if(this.project != null){
        this.prepareActiveSprint();
        console.log("board active sprint",this.activeSprint)
        
        for(var i =0;i<this.project.board.length;i++){
          this.connections.push("section"+i)
          this.stagingArea.push(this.project.board[i])
        }
      }
      // else{
      //   this.router.navigate(['../ProjectsList']);
      // }
    })

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
        
        this.seperateIssues();
        this.groupBy("None");
      }
    }


  }

  seperateIssues(){
  //Preparing empty status arrays in activeSprint object
    console.log("seperate issues called", this.activeSprint)
    for(let section of this.project.board){
      this.activeSprint[section] = [];
    }

    // Arranging issues in the active sprint according to their statuses
    for(var i = 0; i < this.activeSprint.issues.length; i++){
      let issue = this.project.issues.filter((issue : any) => issue.issue_id === this.activeSprint.issues[i])[0];
      this.activeSprint[issue.status].push(issue);
    }
  
  }

  groupBy(option: string) {
    this.groupByOption = option;

    if(this.groupByOption === "None"){
      console.log("grouping by none")
      for(let section of this.project.board){
        this.activeSprint[section].sort((a : any,b : any)=> {
          if(parseInt(a.modifiedAt) > parseInt(b.modifiedAt))
            return -1;
          else if(parseInt(a.modifiedAt) < parseInt(b.modifiedAt))
            return 1;
          else
            return 0;
        })
      }
    }
    else if(this.groupByOption === "User"){
      let users = this.project.members.map((member : any) => member.user_id);
      for(let section of this.project.board){
        let temp : any = [];
        for(let user of users){
          let userIssues = this.activeSprint[section].filter((issue : any) => issue.assignee.user_id === user);
          temp = temp.concat(userIssues);
        }
        this.activeSprint[section] = [];
        this.activeSprint[section] = temp;
      }
    }
    else if(this.groupByOption === "Priority"){
      let priorities = ["High","Medium","Low"];
      for(let section of this.project.board){
        let temp : any = [];
        for(let priority of priorities){
          let priorityIssues = this.activeSprint[section].filter((issue : any) => issue.priority === priority);
          temp = temp.concat(priorityIssues);
        }
        this.activeSprint[section] = [];
        this.activeSprint[section] = temp;
      }
    }
    
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
        this.updateStatus()
    }
  }

  dropStage(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.stagingArea, event.previousIndex, event.currentIndex);
  }

  updateStatus(){
    for(let section of this.project.board){
      for(let issue of this.activeSprint[section]){
        if(section !== issue.status){
          //call backend to update status as well as update modifiedAt of the issue

          issue.status = section;
        }
      }
    }
  }

  addSection(){
    if(this.stagingArea.includes(this.newSectionName)){
      this.newSectionName = '';
      this.sectionNamePlaceholder = "Section already exists";
      return
    }
    this.stagingArea.push(this.newSectionName)
    this.newSectionName = '';
    this.sectionNamePlaceholder = "Section Name"
  }

  deleteSectionfromStageArea(index : any){
    let fromSection = this.stagingArea[index];
    let toSection = index === 0 ? this.stagingArea[1] : this.stagingArea[index-1];
    if(this.activeSprint[fromSection]?.length > 0){
      this.updateIssueStatus = true;
      this.fromSection = fromSection;
      this.toSection = toSection;
      this.stagingArea.splice(index,1)
    }
    else{
      this.updateIssueStatus = false;
      this.stagingArea.splice(index,1)
    }
  }

  updateBoard(){
    //backend call to update board
    if(this.updateIssueStatus){
      for(let issue of this.activeSprint[this.fromSection]){
        issue.status = this.toSection;
      }
    }
    this.project.board = [...this.stagingArea];
    this.seperateIssues();
    this.closebtn?.nativeElement.click();


  }

  refresh(){
    this.stagingArea = [...this.project.board]
    this.newSectionName = ''
  }

  selectIssue(issue : any){
    this.updatedSelectedIssue = null
    this.updatedSelectedIssueDueDate = null;
    this.editIssue = false
    this.selectedIssue = issue;
    this.updatedSelectedIssue = {...this.selectedIssue};
    this.updatedSelectedIssueDueDate = new FormControl(moment.utc(parseInt(this.updatedSelectedIssue.dueDate)).toISOString())
    this.selectedIssue.createdAtHR = this.HRDateFormat(this.selectedIssue.createdAt, false)
    this.selectedIssue.modifiedAtHR = this.HRDateFormat(this.selectedIssue.modifiedAt, false)
    this.selectedIssue.dueDateHR = this.HRDateFormat(this.selectedIssue.dueDate, true)
    console.log(this.selectedIssue)
  }

  myFilter(sections : any){
    return sections.filter((section : any) => section !== this.selectedIssue?.status)
  }

  changeIssueStatus(status : any){
    let prevSection = this.selectedIssue.status;
    this.selectedIssue.status = status;
    this.selectedIssue.modifiedAt = Date.now();
    this.selectedIssue.modifiedAtHR = this.HRDateFormat(this.selectedIssue.modifiedAt, false)
    //update in backend

    this.seperateIssues()

  }

  HRDateFormat(timestamp : any,isDueDate : any){
    // convert timestamp to this format : 24 March 2020, 11:24 AM
    const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    let date = new Date(parseInt(timestamp));
    console.log(date)
    let day = date.getDate();
    var day2 = day < 10 ? '0' + day : day;
    let month = monthNames[date.getMonth()];
    let year = date.getFullYear();

    var currentOffset = date.getTimezoneOffset();
    var ISTOffset = 330;
    var ISTTime = new Date(date.getTime() + (ISTOffset + currentOffset)*60000);

    var hoursIST = ISTTime.getHours()
    var hours = hoursIST > 12 ? hoursIST - 12 : hoursIST;
    var hours2 = hours < 10 ? "0" + hours : hours;
    var minutesIST = ISTTime.getMinutes()
    var minutes = minutesIST < 10 ? "0" + minutesIST : minutesIST;

    if(isDueDate)
      return month + " " + day2 + ", " + year;
    return ''+month+' '+day2+', '+year+', '+hours2+':'+minutes+' '+(hoursIST >= 12 ? 'PM' : 'AM');

  }

  deleteIssue(){
    //delete from backend
    
    //delete it from project issues using filter function
    this.closeIssueModalbtn?.nativeElement.click();
    //delete from active sprint issues
    this.activeSprint.issues = this.activeSprint.issues.filter((id : any) => id !== this.selectedIssue.issue_id)
    this.project.issues = this.project.issues.filter((issue : any) => issue.issue_id !== this.selectedIssue.issue_id)
    console.log(this.project.issues)
    this.selectedIssue = null;
    console.log(this.activeSprint)
    this.seperateIssues();
  }

  editIssueOption(){
    this.editIssue = !this.editIssue;
    console.log("edited",this.updatedSelectedIssue)
    this.updatedSelectedIssue = {...this.selectedIssue};
    this.updatedSelectedIssueDueDate = new FormControl(moment.utc(parseInt(this.updatedSelectedIssue.dueDate)).toISOString())
    console.log(this.updatedSelectedIssueDueDate.value.valueOf())
    console.log("original",this.selectedIssue)
    console.log("edited",this.updatedSelectedIssue)
  }

  updateSelectedIssueAssignee(assignee : any){
    this.updatedSelectedIssue.assignee = {...assignee};
  }

  updateSelectedIssuePriority(priority : any){
    this.updatedSelectedIssue.priority = priority;
    this.updatedSelectedIssue.priority_icon = priority === "High" ? "../../assets/issue-priority-high.svg" : (priority === "Medium" ? "../../assets/issue-priority-medium.svg" : "../../assets/issue-priority-low.svg")
  }

  updateSelectedIssueEpic(epic : any){
    this.updatedSelectedIssue.epic = {...epic};
  }

  updateSelectedIssueType(type : any){
    this.updatedSelectedIssue.type = type;
    this.updatedSelectedIssue.type_icon = type === "story" ? "../../assets/issue-type-story.svg" : (type === "task" ? "../../assets/issue-type-task.svg" : "../../assets/issue-type-bug.svg")
  }

  isNumeric(value: any): boolean {
    return !isNaN(value - parseFloat(value));
}

  saveEditedIssue(){
    this.editIssue = !this.editIssue;
    if(this.isNumeric(this.updatedSelectedIssueDueDate.value.valueOf())){
      this.updatedSelectedIssue.dueDate = this.updatedSelectedIssueDueDate.value.valueOf()
      this.updatedSelectedIssue.dueDateHR = this.HRDateFormat(this.updatedSelectedIssue.dueDate, true)
    }
    if(
      this.selectedIssue.epic?.epic_id !== this.updatedSelectedIssue.epic?.epic_id ||
      this.selectedIssue.assignee.user_id !== this.updatedSelectedIssue.assignee.user_id ||
      this.selectedIssue.priority !== this.updatedSelectedIssue.priority ||
      this.selectedIssue.type !== this.updatedSelectedIssue.type ||
      this.selectedIssue.dueDate !== this.updatedSelectedIssue.dueDate ||
      this.selectedIssue.description !== this.updatedSelectedIssue.description ||
      this.selectedIssue.name !== this.updatedSelectedIssue.name
      ){
      this.updatedSelectedIssue.modifiedAt = Date.now();
      this.updatedSelectedIssue.modifiedAtHR = this.HRDateFormat(this.updatedSelectedIssue.modifiedAt, false)
      this.selectedIssue = {...this.updatedSelectedIssue};
      console.log("saving selectedIssue",this.selectedIssue)
      let foundIndex = this.activeSprint[this.selectedIssue.status].findIndex((issue : any) => issue.issue_id === this.selectedIssue.issue_id);
      let foundIndex2 = this.project.issues.findIndex((issue : any) => issue.issue_id === this.selectedIssue.issue_id);
      
      this.activeSprint[this.selectedIssue.status].splice(foundIndex,1,{...this.selectedIssue})
      this.project.issues.splice(foundIndex2,1,{...this.selectedIssue})
      this._dsService.updateIssue(this.project.project_id,this.selectedIssue).subscribe(
        (data : any) => {
          console.log(data)
        }
      )
    }
  }

}
