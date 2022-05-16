import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as _moment from 'moment';
import { DataService } from '../data.service';

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
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css'],
})
export class IssuesComponent implements OnInit {
  constructor(private _dsService: DataService, private route: ActivatedRoute) {}

  project: any = null;

  user: any = null;

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
    this._dsService.getDetails().subscribe((data: any) => {
      this.user = data.user;
    });
    let projectId = this.route.snapshot.paramMap.get('projectId');
    this._dsService.getProjectDetails(projectId).subscribe((data: any) => {
      this.project = data.data;
    });
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

    this.backendUpdateIssue();
  }

  deleteIssue() {
    //delete it from project issues using filter function
    this.closeIssueModalbtn?.nativeElement.click();
    //delete from active sprint issues
    let sprintIssues = this.project.Sprint.issues.map(
      (issue: any) => issue.issue_id
    );
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
