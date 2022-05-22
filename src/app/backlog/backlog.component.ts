import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  CdkDragDrop,
  CDK_DRAG_CONFIG,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { FormControl } from '@angular/forms';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

import * as _moment from 'moment';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';

const moment = _moment;

const DragConfig = {
  dragStartThreshold: 0,
  pointerDirectionChangeThreshold: 5,
  zIndex: 10000,
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
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css'],
  providers: [
    { provide: CDK_DRAG_CONFIG, useValue: DragConfig },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class BacklogComponent implements OnInit {
  constructor(private _dsService: DataService, private route: ActivatedRoute) {}

  dummyProjectDetails = {
    project_name: 'Dummy 5',
    project_key: 'DM5',
    backlog: ['1228', '1229', '1230'],
    board: ['to do', 'in progress', 'done'],
    isOwner: true,
    Sprint: {
      sprint_id: '345345346',
      sprint_name: 'Sprint 3',
      started: true,
      completed: false,
      duration: 3,
      startDate: '1648319400000',
      endDate: '1650220200000',
      goal: 'sdfdsfdsffsdf',
      issues: ['1227'],
      remainingTime: 7,
      done: [],
    },
    Issues: [
      {
        issue_id: '1221',
        tag: 'DM5-1',
        name: 'Drafting Abstract',
        type: 'story',
        type_icon: '../../assets/issue-type-story.svg',
        createdAt: '1648356790000',
        attachment: 'sdfdsfdf',
        description: 'sdfsdfsdf',
        priority: 'High',
        priority_icon: '../../assets/issue-priority-high.svg',
        status: 'done',
        sprint: {
          sprint_id: '345345345',
          sprint_name: 'Sprint-2',
        },
        epic: null,
        dueDate: '1648837900000',
        assignee: {
          user_id: '345345345',
          name: 'Yashwanth Reddy',
          img: 'dfgdfgdfg',
          dummy_img: 'YR',
        },
        reporter: {
          user_id: '345345345',
          name: 'Yashwanth Reddy',
          img: 'dfgdfgdfg',
          dummy_img: 'YR',
        },
        modifiedAt: '1648647309624',
      },
      {
        issue_id: '1222',
        tag: 'DM5-2',
        name: 'Drafting Abstract',
        type: 'story',
        type_icon: '../../assets/issue-type-story.svg',
        createdAt: '1648356790000',
        attachment: 'sdfdsfdf',
        description: 'sdfsdfsdf',
        priority: 'High',
        priority_icon: '../../assets/issue-priority-high.svg',
        status: 'done',
        sprint: {
          sprint_id: '345345345',
          sprint_name: 'Sprint-2',
        },
        epic: null,
        dueDate: '1648837900000',
        assignee: {
          user_id: '345345345',
          name: 'Yashwanth Reddy',
          img: 'dfgdfgdfg',
          dummy_img: 'YR',
        },
        reporter: {
          user_id: '345345345',
          name: 'Yashwanth Reddy',
          img: 'dfgdfgdfg',
          dummy_img: 'YR',
        },
        modifiedAt: '1648647309624',
      },
      {
        issue_id: '1223',
        tag: 'DM5-3',
        name: 'Drafting Abstract',
        type: 'story',
        type_icon: '../../assets/issue-type-story.svg',
        createdAt: '1648356790000',
        attachment: 'sdfdsfdf',
        description: 'sdfsdfsdf',
        priority: 'High',
        priority_icon: '../../assets/issue-priority-high.svg',
        status: 'done',
        sprint: {
          sprint_id: '345345345',
          sprint_name: 'Sprint-2',
        },
        epic: null,
        dueDate: '1648837900000',
        assignee: {
          user_id: '345345345',
          name: 'Yashwanth Reddy',
          img: 'dfgdfgdfg',
          dummy_img: 'YR',
        },
        reporter: {
          user_id: '345345345',
          name: 'Yashwanth Reddy',
          img: 'dfgdfgdfg',
          dummy_img: 'YR',
        },
        modifiedAt: '1648647309624',
      },
      {
        issue_id: '1224',
        tag: 'DM5-4',
        name: 'Drafting Abstract',
        type: 'story',
        type_icon: '../../assets/issue-type-story.svg',
        createdAt: '1648356790000',
        attachment: 'sdfdsfdf',
        description: 'sdfsdfsdf',
        priority: 'High',
        priority_icon: '../../assets/issue-priority-high.svg',
        status: 'to do',
        sprint: {
          sprint_id: '345345346',
          sprint_name: 'Sprint-3',
        },
        epic: null,
        dueDate: '1648837900000',
        assignee: {
          user_id: '345345345',
          name: 'Yashwanth Reddy',
          img: 'dfgdfgdfg',
          dummy_img: 'YR',
        },
        reporter: {
          user_id: '345345345',
          name: 'Yashwanth Reddy',
          img: 'dfgdfgdfg',
          dummy_img: 'YR',
        },
        modifiedAt: '1648647309624',
      },
      {
        issue_id: '1225',
        tag: 'DM5-5',
        name: 'Writing Abstract',
        type: 'story',
        type_icon: '../../assets/issue-type-story.svg',
        createdAt: '1648356790000',
        attachment: 'sdfdsfdf',
        description: 'sdfsdfsdf',
        priority: 'High',
        priority_icon: '../../assets/issue-priority-high.svg',
        status: 'done',
        sprint: {
          sprint_id: '345345346',
          sprint_name: 'Sprint-3',
        },
        epic: null,
        dueDate: '1648837900000',
        assignee: {
          user_id: '345345345',
          name: 'Yashwanth Reddy',
          img: 'dfgdfgdfg',
          dummy_img: 'YR',
        },
        reporter: {
          user_id: '345345345',
          name: 'Yashwanth Reddy',
          img: 'dfgdfgdfg',
          dummy_img: 'YR',
        },
        modifiedAt: '1648647309624',
      },
      {
        issue_id: '1226',
        tag: 'DM5-6',
        name: 'Drafting Abstract',
        type: 'story',
        type_icon: '../../assets/issue-type-story.svg',
        createdAt: '1648356790000',
        attachment: 'sdfdsfdf',
        description: 'sdfsdfsdf',
        priority: 'High',
        priority_icon: '../../assets/issue-priority-high.svg',
        status: 'in progress',
        sprint: {
          sprint_id: '345345346',
          sprint_name: 'Sprint-3',
        },
        epic: null,
        dueDate: '1648837900000',
        assignee: {
          user_id: '345345345',
          name: 'Yashwanth Reddy',
          img: 'https://lh3.googleusercontent.com/a-/AOh14GiMoXv2UdCvjKpYYYRiti07Cw8uaLKYIZWrlCvwnw=s96-c',
          dummy_img: 'YR',
        },
        reporter: {
          user_id: '345345345',
          name: 'Yashwanth Reddy',
          img: 'dfgdfgdfg',
          dummy_img: 'YR',
        },
        modifiedAt: '1648647309624',
      },
      {
        issue_id: '1227',
        tag: 'DM5-7',
        name: 'Drafting Abstract',
        type: 'story',
        type_icon: '../../assets/issue-type-story.svg',
        createdAt: '1648356790000',
        attachment: 'sdfdsfdf',
        description: 'sdfsdfsdf',
        priority: 'High',
        priority_icon: '../../assets/issue-priority-high.svg',
        status: 'to do',
        sprint: {
          sprint_id: '345345346',
          sprint_name: 'Sprint-3',
        },
        epic: null,
        dueDate: '1648837900000',
        assignee: {
          user_id: '345345345',
          name: 'Yashwanth Reddy',
          img: null,
          dummy_img: 'YR',
        },
        reporter: {
          user_id: '345345345',
          name: 'Yashwanth Reddy',
          img: 'dfgdfgdfg',
          dummy_img: 'YR',
        },
        modifiedAt: '1648647309624',
      },
      {
        issue_id: '1228',
        tag: 'DM5-8',
        name: 'Drafting Abstract',
        type: 'story',
        type_icon: '../../assets/issue-type-story.svg',
        createdAt: '1648356790000',
        attachment: 'sdfdsfdf',
        description: 'sdfsdfsdf',
        priority: 'High',
        priority_icon: '../../assets/issue-priority-high.svg',
        status: 'to do',
        sprint: null,
        epic: null,
        dueDate: '1648837900000',
        assignee: {
          user_id: '345345345',
          name: 'Yashwanth Reddy',
          img: 'dfgdfgdfg',
          dummy_img: 'YR',
        },
        reporter: {
          user_id: '345345345',
          name: 'Yashwanth Reddy',
          img: 'dfgdfgdfg',
          dummy_img: 'YR',
        },
        modifiedAt: '1648647309624',
      },
      {
        issue_id: '1229',
        tag: 'DM5-9',
        name: 'Drafting Abstract',
        type: 'story',
        type_icon: '../../assets/issue-type-story.svg',
        createdAt: '1648356790000',
        attachment: 'sdfdsfdf',
        description: 'sdfsdfsdf',
        priority: 'High',
        priority_icon: '../../assets/issue-priority-high.svg',
        status: 'to do',
        sprint: null,
        epic: null,
        dueDate: '1648837900000',
        assignee: {
          user_id: '345345345',
          name: 'Yashwanth Reddy',
          img: 'dfgdfgdfg',
          dummy_img: 'YR',
        },
        reporter: {
          user_id: '345345345',
          name: 'Yashwanth Reddy',
          img: 'dfgdfgdfg',
          dummy_img: 'YR',
        },
        modifiedAt: '1648647309624',
      },
      {
        issue_id: '1230',
        tag: 'DM5-10',
        name: 'Drafting Abstract',
        type: 'story',
        type_icon: '../../assets/issue-type-story.svg',
        createdAt: '1648356790000',
        attachment: 'sdfdsfdf',
        description: 'sdfsdfsdf',
        priority: 'High',
        priority_icon: '../../assets/issue-priority-high.svg',
        status: 'to do',
        sprint: null,
        epic: null,
        dueDate: '1648837900000',
        assignee: {
          user_id: '345345345',
          name: 'Yashwanth Reddy',
          img: 'dfgdfgdfg',
          dummy_img: 'YR',
        },
        reporter: {
          user_id: '345345345',
          name: 'Yashwanth Reddy',
          img: 'dfgdfgdfg',
          dummy_img: 'YR',
        },
        modifiedAt: '1648647309624',
      },
    ],
  };

  project: any = null;

  user : any = null;

  searchQuery: string = '';

  connections: any = ['sprint', 'backlog'];

  updateIssueStatus: any = null;

  selectedIssue: any = null;

  updatedSelectedIssue: any = null;

  editIssue: boolean = false;

  editSprint: boolean = false;

  updatedSelectedIssueDueDate: any = null;

  madeUpdates: boolean = false;

  @ViewChild('closeIssueModal') closeIssueModalbtn: ElementRef | undefined;

  @ViewChild('closeDeleteSprintModal') closeDeleteSprintModalbtn:
    | ElementRef
    | undefined;

  @ViewChild('closeCompleteSprintModal') closeCompleteSprintModalbtn:
    | ElementRef
    | undefined;

  @ViewChild('closeStartSprintModal') closeStartSprintModalbtn:
    | ElementRef
    | undefined;

  @ViewChild('closeCreateIssueModal') closeCreateIssueModalbtn:
    | ElementRef
    | undefined;

  sprintName: string = '';

  startDate: any = new FormControl(moment());

  endDate: any = new FormControl(moment().add(7, 'days'));

  endDateError: boolean = false;

  createIssueTemplate: any;

  createIssueTemplateDueDate: any = new FormControl(moment());

  ngOnInit(): void {
    this._dsService.getDetails().subscribe((data : any) => {
      this.user = data.user
    });
    let projectId = this.route.snapshot.paramMap.get('projectId');
    this._dsService.getProjectDetails(projectId).subscribe((data : any) => {
      this.project = data.data
      this.prepareSprint();
      
      console.log(this.project)
      let now = new Date();
      let startOfDay: any = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      );
      let timestamp = startOfDay / 1;
      if (this.project.Sprint.endDate <= timestamp) {
        this.completeSprint();
      }
      // let sprintIssues = this.project.Sprint.issues;
      // this.project.Sprint.issues = []
      // this.project.Issues.forEach((issue : any) => {
      //   if (sprintIssues.indexOf(issue.issue_id) !== -1) {
      //     this.project.Sprint.issues.push(issue);
      //   }
      // })
      // this.backendUpdateIssues()
    })
  }

  prepareSprint() {
    // Selecting Active Sprint from all sprints
    if (this.project.Sprint != null) {
      console.log(this.project);
      let now = new Date();
      let startOfDay: any = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      );
      if (this.project.Sprint.sprint_name && this.project.Sprint.sprint_name !== "") {
        let timestamp = startOfDay / 1;
        this.project.Sprint.remainingTime =
          (this.project.Sprint.endDate - timestamp) / (1000 * 60 * 60 * 24);
        this.project.Sprint.remainingTime = Math.round(this.project.Sprint.remainingTime);
        console.log(this.project.Sprint.remainingTime);
        this.project.Sprint.startDateHR = this.HRDateFormat(
          this.project.Sprint.startDate,
          'sprintDate'
        );
        this.project.Sprint.endDateHR = this.HRDateFormat(
          this.project.Sprint.endDate,
          'sprintDate'
        );
      }
    } else {
      this.project.Sprint = {
        started: false,
        completed: false,
        issues: [],
        sprint_id: 'sprint' + Date.now(),
      };
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.updateSprintAndBacklog();
    }
  }

  updateSprintAndBacklog() {
    console.log('updateSprintAndBacklog');
    //get issue index from issue objects
    // let sprintIssues = this.project.Sprint.issues.map((issue: any) => issue.issue_id);
    // let backlogIssues = this.project.backlog.map(
    //   (issue: any) => issue.issue_id
    // );

    // //update sprint and backlog
    // this.project.Sprint.issues = [];
    // this.project.backlog = [];
    // this.project.Sprint.issues = [...sprintIssues];
    // this.project.backlog = [...backlogIssues];

    
    this.project.backlog = this.project.backlog.map((issue : any)=>{
      issue.sprint = null
      return issue
    })
    
    this.project.Sprint.issues = this.project.Sprint.issues.map((issue : any)=>{
      issue.sprint = {}
      issue.sprint.sprint_id = this.project.Sprint.sprint_id
      issue.sprint.sprint_name = this.project.Sprint.sprint_name
      return issue
    })
    let backlogIssues = this.project.backlog.map((issue : any)=>issue.issue_id)
    let sprintIssues = this.project.Sprint.issues.map((issue : any)=>issue.issue_id)

    this.project.Issues = this.project.Issues.map((issue : any)=>{
      if(backlogIssues.includes(issue.issue_id)){
        issue.sprint = null
      }
      if(sprintIssues.includes(issue.issue_id)){
        issue.sprint = {}
        issue.sprint.sprint_id = this.project.Sprint.sprint_id
        issue.sprint.sprint_name = this.project.Sprint.sprint_name
      }
      return issue
    })
    // make backend call to put these sprintIssues and backlogIssues array indexes
    this.backendUpdateIssues()
  }

  selectIssue(issue: any) {
    console.log(issue);
    this.updatedSelectedIssue = null;
    this.updatedSelectedIssueDueDate = null;
    this.editIssue = false;
    this.selectedIssue = issue;
    this.updatedSelectedIssue = { ...this.selectedIssue };
    this.updatedSelectedIssueDueDate = new FormControl(
      moment.utc(parseInt(this.updatedSelectedIssue.dueDate)).toISOString()
    );
    this.selectedIssue.createdAtHR = this.HRDateFormat(
      this.selectedIssue.createdAt,
      'issueDate'
    );
    this.selectedIssue.modifiedAtHR = this.HRDateFormat(
      this.selectedIssue.modifiedAt,
      'issueDate'
    );
    this.selectedIssue.dueDateHR = this.HRDateFormat(
      this.selectedIssue.dueDate,
      'dueDate'
    );
  }

  HRDateFormat(timestamp: any, type: any) {
    // convert timestamp to this format : 24 March 2020, 11:24 AM
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let date = new Date(parseInt(timestamp));
    console.log(date);
    let day = date.getDate();
    var day2 = day < 10 ? '0' + day : day;
    let month = monthNames[date.getMonth()];
    let year = date.getFullYear();

    var currentOffset = date.getTimezoneOffset();
    var ISTOffset = 330;
    var ISTTime = new Date(
      date.getTime() + (ISTOffset + currentOffset) * 60000
    );

    var hoursIST = ISTTime.getHours();
    var hours = hoursIST > 12 ? hoursIST - 12 : hoursIST;
    var hours2 = hours < 10 ? '0' + hours : hours;
    var minutesIST = ISTTime.getMinutes();
    var minutes = minutesIST < 10 ? '0' + minutesIST : minutesIST;

    if (type === 'dueDate') {
      return month + ' ' + day2 + ', ' + year;
    } else if (type === 'sprintDate') {
      return month + ' ' + day2;
    }
    return (
      '' +
      month +
      ' ' +
      day2 +
      ', ' +
      year +
      ', ' +
      hours2 +
      ':' +
      minutes +
      ' ' +
      (hoursIST >= 12 ? 'PM' : 'AM')
    );
  }

  myFilter(sections: any) {
    return sections.filter(
      (section: any) => section !== this.selectedIssue?.status
    );
  }

  changeIssueStatus(status: any) {
    this.selectedIssue.status = status;
    this.selectedIssue.modifiedAt = Date.now();
    this.selectedIssue.modifiedAtHR = this.HRDateFormat(
      this.selectedIssue.modifiedAt,
      'issueDate'
    );
    
    this.backendUpdateIssue()
  }

  deleteIssue() {
    //delete it from project issues using filter function
    this.closeIssueModalbtn?.nativeElement.click();
    //delete from active sprint issues
    let sprintIssues = this.project.Sprint.issues.map((issue: any) => issue.issue_id);
    let backlogIssues = this.project.backlog.map(
      (issue: any) => issue.issue_id
    );
    if (sprintIssues.includes(this.selectedIssue.issue_id)) {
      this.project.Sprint.issues = this.project.Sprint.issues.filter(
        (issue: any) => issue.issue_id !== this.selectedIssue.issue_id
      );
    }
    if (backlogIssues.includes(this.selectedIssue.issue_id)) {
      this.project.backlog = this.project.backlog.filter(
        (issue: any) => issue.issue_id !== this.selectedIssue.issue_id
      );
    }
    this.project.Issues = this.project.Issues.filter(
      (issue: any) => issue.issue_id !== this.selectedIssue.issue_id
    );
    this.backendUpdateIssues();
    // this.prepareSprint();
    
    this.selectedIssue = null;
    // this.seperateIssues();
  }

  editIssueOption() {
    this.editIssue = !this.editIssue;
    this.updatedSelectedIssue = { ...this.selectedIssue };
    this.updatedSelectedIssueDueDate = new FormControl(
      moment.utc(parseInt(this.updatedSelectedIssue.dueDate)).toISOString()
    );
    console.log(this.updatedSelectedIssueDueDate.value.valueOf());
  }

  updateSelectedIssueAssignee(assignee: any) {
    this.updatedSelectedIssue.assignee = { ...assignee };
  }

  updateSelectedIssuePriority(priority: any) {
    this.updatedSelectedIssue.priority = priority;
    this.updatedSelectedIssue.priority_icon =
      priority === 'High'
        ? '../../assets/issue-priority-high.svg'
        : priority === 'Medium'
        ? '../../assets/issue-priority-medium.svg'
        : '../../assets/issue-priority-low.svg';
  }

  updateSelectedIssueEpic(epic: any) {
    this.updatedSelectedIssue.epic = { ...epic };
  }

  updateSelectedIssueType(type: any) {
    this.updatedSelectedIssue.type = type;
    this.updatedSelectedIssue.type_icon =
      type === 'story'
        ? '../../assets/issue-type-story.svg'
        : type === 'task'
        ? '../../assets/issue-type-task.svg'
        : '../../assets/issue-type-bug.svg';
  }

  isNumeric(value: any): boolean {
    return !isNaN(value - parseFloat(value));
  }

  saveEditedIssue() {
    this.editIssue = !this.editIssue;
    if (this.isNumeric(this.updatedSelectedIssueDueDate.value.valueOf())) {
      this.updatedSelectedIssue.dueDate =
        this.updatedSelectedIssueDueDate.value.valueOf();
      this.updatedSelectedIssue.dueDateHR = this.HRDateFormat(
        this.updatedSelectedIssue.dueDate,
        'dueDate'
      );
    }
    if (
      this.selectedIssue.epic?.epic_id !==
        this.updatedSelectedIssue.epic?.epic_id ||
      this.selectedIssue.assignee.user_id !==
        this.updatedSelectedIssue.assignee.user_id ||
      this.selectedIssue.priority !== this.updatedSelectedIssue.priority ||
      this.selectedIssue.type !== this.updatedSelectedIssue.type ||
      this.selectedIssue.dueDate !== this.updatedSelectedIssue.dueDate ||
      this.selectedIssue.description !==
        this.updatedSelectedIssue.description ||
      this.selectedIssue.name !== this.updatedSelectedIssue.name
    ) {
      this.updatedSelectedIssue.modifiedAt = Date.now();
      this.updatedSelectedIssue.modifiedAtHR = this.HRDateFormat(
        this.updatedSelectedIssue.modifiedAt,
        'issueDate'
      );
      this.selectedIssue = { ...this.updatedSelectedIssue };
    }
    this.backendUpdateIssue();
  }

  completeSprint() {
    this.project.Sprint.completed = true;
    this.project.Sprint.started = false;
    this.project.Sprint.completedAt = Date.now();
    this.project.Sprint.completedAtHR = this.HRDateFormat(
      this.project.Sprint.completedAt,
      'sprintDate'
    );
    //update sprint status in this.project.Sprint
    this.project.Sprint = { ...this.project.Sprint };
    // remove all done issues
    this.project.Sprint.issues = this.project.Sprint.issues.filter(
      (issue: any) => issue.status !== 'done'
    );

    this.project.Sprint.issues.forEach((issue: any) => {
      this.project.backlog.push({...issue,sprint:null})
    });

    let sprintIssues = this.project.Sprint.issues.map((issue: any) => issue.issue_id);
    this.project.Issues = this.project.Issues.map((issue: any) => {
      if (sprintIssues.includes(issue.issue_id)) {
        issue.sprint = null;
      }
      return issue;
    });

    this.project.Sprint = null;
    this.prepareSprint();

    this.backendUpdateIssues()

    this.closeCompleteSprintModalbtn?.nativeElement.click();
  }

  deleteSprint() {
    this.project.Sprint.issues.forEach((issue: any) => {
      this.project.backlog.push({...issue,sprint:null})
    })
    let sprintIssues = this.project.Sprint.issues.map((issue: any) => issue.issue_id);
    this.project.Issues = this.project.Issues.map((issue: any) => {
      if (sprintIssues.includes(issue.issue_id)) {
        issue.sprint = null;
      }
      return issue;
    });
    this.project.Sprint = null;
    this.prepareSprint();
    
    this.closeDeleteSprintModalbtn?.nativeElement.click();

    this.backendUpdateIssues()
  }

  startSprint() {
    if (
      this.startDate.invalid ||
      this.endDate.invalid ||
      this.sprintName.length === 0
    ) {
      return;
    }
    if (
      Math.floor(this.startDate?.value.valueOf() / 1000) >=
      Math.floor(this.endDate?.value.valueOf() / 1000)
    ) {
      this.endDateError = true;
      return;
    }
    this.project.Sprint.started = true;
    this.project.Sprint.completed = false;
    this.project.Sprint.sprint_name = this.sprintName;
    // this.project.Sprint.sprint_id = 'sprint' + Date.now();
    this.project.Sprint.startDate = this.startDate?.value.valueOf();
    this.project.Sprint.endDate = this.endDate?.value.valueOf() + 86399000;
    let sprintIssues = this.project.Sprint.issues.map((issue: any) => issue.issue_id);
    // let backlogIssues = this.project.backlog.map(
    //   (issue: any) => issue.issue_id
    // );
    // this.project.Sprint.issues = [];
    // this.project.Sprint.issues = [...sprintIssues];
    // this.project.backlog = [];
    // this.project.backlog = [...backlogIssues];
    this.project.Issues = this.project.Issues.map((issue: any) => {
      if (sprintIssues.includes(issue.issue_id)) {
        issue.sprint.sprint_id = this.project.Sprint.sprint_id;
        issue.sprint.sprint_name = this.project.Sprint.sprint_name;
      }
      return issue;
    });
    this.project.Sprint.issues = this.project.Sprint.issues.map((issue: any) => {
      issue.sprint.sprint_id = this.project.Sprint.sprint_id;
      issue.sprint.sprint_name = this.project.Sprint.sprint_name;
      return issue;
    });
    console.log(this.project.Sprint);
    console.log(this.project);
    // this.project.Sprint = { ...this.project.Sprint };
    this.prepareSprint();
    
    this.closeStartSprintModalbtn?.nativeElement.click();
    this.endDateError = false;
    this.sprintName = '';
    this.startDate = new FormControl(moment());
    this.endDate = new FormControl(moment().add(7, 'days'));

    this.backendUpdateIssues()

  }

  setEditSprint() {
    this.editSprint = true;
    this.sprintName = this.project.Sprint.sprint_name;
    this.startDate = new FormControl(
      moment.utc(parseInt(this.project.Sprint.startDate)).toISOString()
    );
    this.endDate = new FormControl(
      moment.utc(parseInt(this.project.Sprint.endDate)).toISOString()
    );
  }

  saveSprint() {
    this.project.Sprint.sprint_name = this.sprintName;
    if (this.isNumeric(this.startDate?.value.valueOf())) {
      this.project.Sprint.startDate = this.startDate?.value.valueOf();
    }
    if (this.isNumeric(this.endDate?.value.valueOf())) {
      this.project.Sprint.endDate = this.endDate?.value.valueOf();
    }
    console.log(this.project.Sprint.startDate);
    console.log(this.project.Sprint.endDate);
    if (
      Math.floor(this.project.Sprint.startDate / 1000) >=
      Math.floor(this.project.Sprint.endDate / 1000)
    ) {
      this.endDateError = true;
      return;
    }
    this.project.Sprint.issues = this.project.Sprint.issues.map((issue : any) => {
      issue.sprint = {}
      issue.sprint.sprint_id = this.project.Sprint.sprint_id;
      issue.sprint.sprint_name = this.project.Sprint.sprint_name;
      return issue
    })

    let sprintIssues = this.project.Sprint.issues.map((issue: any) => issue.issue_id);

    this.project.Issues = this.project.Issues.map((issue: any) => {
      if (sprintIssues.includes(issue.issue_id)) {
        issue.sprint = {}
        issue.sprint.sprint_id = this.project.Sprint.sprint_id;
        issue.sprint.sprint_name = this.project.Sprint.sprint_name;
      }
      return issue
    })



    this.prepareSprint();
    
    this.closeStartSprintModalbtn?.nativeElement.click();
    this.editSprint = false;
    this.endDateError = false;

    this._dsService
      .updateSprint(this.project.project_id, this.project.Sprint)
      .subscribe((data: any) => {
        console.log(data);
      });
  }

  prepareNewIssue(type: any) {
    console.log(this.user)
    this.createIssueTemplateDueDate = new FormControl(moment());
    if (type === 'sprint') {
      this.createIssueTemplate = {
        issue_id: +Date.now(),
        tag: this.project.Issues ?
          this.project.project_key +
          '-' +
          (parseInt(this.project.Issues.length) + 1) : this.project.project_key + '-1',
        name: '',
        type: 'story',
        type_icon: '../../assets/issue-type-story.svg',
        createdAt: +Date.now(),
        attachment: null,
        description: '',
        priority: 'Low',
        priority_icon: '../../assets/issue-priority-low.svg',
        status: 'to do',
        sprint: {
          sprint_id:
            this.project.Sprint && this.project.Sprint.started === true ? this.project.Sprint.sprint_id : '',
          sprint_name:
            this.project.Sprint && this.project.Sprint.started === true ? this.project.Sprint.sprint_name : '',
        },
        epic: null,
        dueDate: +Date.now(),
        assignee: {
          user_id: this.user.user_id,
          name: this.user.name,
          img: this.user.displayPicture,
          dummy_img: this.user.dummy_img,
        },
        reporter: {
          user_id: this.user.user_id,
          name: this.user.name,
          img: this.user.displayPicture,
          dummy_img: this.user.dummy_img,
        },
        modifiedAt: +Date.now(),
      };
      console.log("Create ISsues template assignee",this.createIssueTemplate.assignee)
    } else if (type === 'backlog') {
      this.createIssueTemplate = {
        issue_id: +Date.now(),
        tag:
          this.project.project_key +
          '-' +
          (parseInt(this.project.Issues.length) + 1),
        name: '',
        type: 'story',
        type_icon: '../../assets/issue-type-story.svg',
        createdAt: +Date.now(),
        attachment: null,
        description: '',
        priority: 'Low',
        priority_icon: '../../assets/issue-priority-low.svg',
        status: 'to do',
        sprint: null,
        epic: null,
        dueDate: +Date.now(),
        assignee: {
          user_id: this.user.user_id,
          name: this.user.name,
          img: this.user.displayPicture,
          dummy_img: this.user.dummy_img,
        },
        reporter: {
          user_id: this.user.user_id,
          name: this.user.name,
          img: this.user.displayPicture,
          dummy_img: this.user.dummy_img,
        },
        modifiedAt: +Date.now(),
      };
    }
  }

  updateCreateIssueTemplateType(type: any) {
    this.createIssueTemplate.type = type;
    this.createIssueTemplate.type_icon =
      type === 'story'
        ? '../../assets/issue-type-story.svg'
        : type === 'task'
        ? '../../assets/issue-type-task.svg'
        : '../../assets/issue-type-bug.svg';
  }
  changeCreateIssueTemplateStatus(status: any) {
    this.createIssueTemplate.status = status;
  }

  updateCreateIssueTemplateAssignee(assignee: any) {
    this.createIssueTemplate.assignee = { ...assignee };
  }

  updateCreateIssueTemplatePriority(priority: any) {
    this.createIssueTemplate.priority = priority;
    this.createIssueTemplate.priority_icon =
      priority === 'High'
        ? '../../assets/issue-priority-high.svg'
        : priority === 'Medium'
        ? '../../assets/issue-priority-medium.svg'
        : '../../assets/issue-priority-low.svg';
  }

  createIssue() {
    this.closeCreateIssueModalbtn?.nativeElement.click();
    if (this.createIssueTemplate?.name.length === 0) {
      return;
    }
    this.createIssueTemplate.dueDate =
      this.createIssueTemplateDueDate.value.valueOf();
    this.project.Issues.push(this.createIssueTemplate);
    console.log("Project Before Updation",this.project)
    if (this.createIssueTemplate.sprint) {
      this.project.Sprint.issues.push(this.createIssueTemplate);
    } else {
      this.project.backlog.push(this.createIssueTemplate);
    }
    this.backendUpdateIssues()
  }

  backendUpdateIssue(){

    this.project.Issues = this.project.Issues.map((issue: any) => {
        if (issue.issue_id === this.selectedIssue.issue_id) {
          issue = { ...this.selectedIssue };
        }
        return issue;
      });

      let sprintIssues = this.project.Sprint.issues.map((issue: any) => issue.issue_id);
      let backlogIssues = this.project.backlog.map(
        (issue: any) => issue.issue_id
      );

      // this.prepareSprint();
      
      if (sprintIssues.includes(this.selectedIssue.issue_id)) {
        let foundIndex = this.project.Sprint.issues.findIndex(
          (issue: any) => issue.issue_id === this.selectedIssue.issue_id
        );
        this.project.Sprint.issues.splice(foundIndex, 1, {
          ...this.selectedIssue,
        });
      }
      if (backlogIssues.includes(this.selectedIssue.issue_id)) {
        let foundIndex2 = this.project.backlog.findIndex(
          (issue: any) => issue.issue_id === this.selectedIssue.issue_id
        );
        this.project.backlog.splice(foundIndex2, 1, { ...this.selectedIssue });
      }
      this.backendUpdateIssues();
    
  }

  backendUpdateIssues(){
    this._dsService.updateSprint(this.project.project_id, this.project.Sprint).subscribe((data: any) => {
        console.log(data);
      })
    this._dsService.updateBacklog(this.project.project_id, this.project.backlog).subscribe((data: any) => {
        console.log(data);
      })
    this._dsService.updateIssues(this.project.project_id, this.project.Issues).subscribe((data: any) => {
      console.log(data);
    });
  }
}
