import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css'],
})
export class BacklogComponent implements OnInit {
  constructor() {}

  dummyProjectDetails = {
    project_name: 'Dummy 5',
    project_key: 'DM5',
    backlog: ['1228', '1229', '1230'],
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
      issues: ['1224', '1225', '1226', '1227'],
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
          status_id: '345345345',
          status_name: 'Sprint-2',
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
          status_id: '345345345',
          status_name: 'Sprint-2',
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
          status_id: '345345345',
          status_name: 'Sprint-2',
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
          status_id: '345345346',
          status_name: 'Sprint-3',
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
          status_id: '345345346',
          status_name: 'Sprint-3',
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
          status_id: '345345346',
          status_name: 'Sprint-3',
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
          status_id: '345345346',
          status_name: 'Sprint-3',
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

  searchQuery: string = '';

  sprint: any = null;

  ngOnInit(): void {
    this.project = this.dummyProjectDetails;
    this.prepareSprint();
    console.log(this.sprint);
  }

  prepareSprint() {
    // Selecting Active Sprint from all sprints
    if (this.project.Sprint != null) {
      this.sprint = this.project.Sprint;
      let now = new Date();
      let startOfDay: any = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      );
      let timestamp = startOfDay / 1;
      this.sprint.remainingTime =
        (this.sprint.endDate - timestamp) / (1000 * 60 * 60 * 24);
      if (this.sprint.completed == false) {
        this.sprint.startDateHR = this.HRDateFormat(
          this.sprint.startDate,
          'sprintDate'
        );
        this.sprint.endDateHR = this.HRDateFormat(
          this.sprint.endDate,
          'sprintDate'
        );
      }
      let issues = this.sprint.issues;
      this.sprint.issues = [];
      for (var i = 0; i < this.project.Issues.length; i++) {
        if (issues.includes(this.project.Issues[i].issue_id)) {
          this.sprint.issues.push(this.project.Issues[i]);
        }
      }
    } else this.sprint = null;
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
}
