import { Q } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private router : Router, private _dsService : DataService,private route : ActivatedRoute) { }

  dummyProjectDetails = {
    project_id : "34534534",
    project_name : "Dummy 5",
    project_key : "DM5",
    createdAt : "1648319400000",
    icon : "../../assets/project-dummy-logo.svg",
    owner : {
      user_id : "1",
      name:"Yashwanth Reddy",
      img : "https://lh3.googleusercontent.com/a-/AOh14GiMoXv2UdCvjKpYYYRiti07Cw8uaLKYIZWrlCvwnw=s96-c",
      dummy_img : "YR"
    },
    isOwner : true,
    code : null
  }

  @ViewChild('close') closebtn : ElementRef | undefined;

  projectDetails : any = null;
  editProjectDetails : any = null;


  fileName: string = "No file selected";
  file!: File;


  ngOnInit(): void {
    let projectId = this.route.snapshot.paramMap.get('projectId');
    this._dsService.getBasicprojectDetails(projectId).subscribe((data:any) => {
        this.projectDetails = data.data;
        this.projectDetails.createdAtHR = this.HRDateFormat(this.projectDetails.createdAt);
        this.editProjectDetails = {...this.projectDetails};
        console.log(this.projectDetails)
        console.log(this.editProjectDetails)
      }
    )
    
  }

  deleteProject(){
    console.log("Delete Project");
    this.closebtn?.nativeElement.click()
    this.router.navigate(['../Projectslist']);
  }

  HRDateFormat(timestamp : any){
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

    return ''+month+' '+day2+', '+year+', '+hours2+':'+minutes+' '+(hoursIST >= 12 ? 'PM' : 'AM');

  }

  onChange(file: any) {

    if (file) {
      this.fileName = file.name;
      this.file = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.editProjectDetails.icon = reader.result;
       
      };
    }
    else
      return
  }

  saveDetails(formObj:NgForm){
    this.projectDetails = {...this.editProjectDetails}

    //formdata obj preperation
    let formData=new FormData();

    //get user object from NgForm object
    let userObj=formObj.value;

    userObj.project_id = this.projectDetails.project_id;

      //append image to it
      formData.append("projectIcon",this.file);

     //append user object by converting it into string
      formData.append("projectDetails",JSON.stringify(userObj));
      
     
     //pass "formData" object to register service to make HTTP POST request 
      this._dsService.updateProjectDetails(userObj.project_id,formData)
      .subscribe((result : any)=>{
        console.log(result);
      })


  }



}
