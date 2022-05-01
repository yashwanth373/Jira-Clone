import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar';

export interface Email {
  mail: string;
}

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  constructor(private _dsService : DataService, private route : ActivatedRoute,private _snackBar: MatSnackBar) { }

  dummyProjectDetails = {
    project_id : "34534534",
    project_name : "Dummy 5",
    owner : {
      user_id : "1"
    },
    isOwner : true,
    members : [
      {
        user_id :"1",
        name : "Yashwanth Reddy",
        img : "https://lh3.googleusercontent.com/a-/AOh14GiMoXv2UdCvjKpYYYRiti07Cw8uaLKYIZWrlCvwnw=s96-c",
        dummy_img : "YR",
        email : "yashuyashwanth05@gmail.com"
      },
      {
        user_id :"2",
        name : "Rakesh Gigachad",
        img : null,
        dummy_img : "RG",
        email : "yashuyashwanth05@gmail.com"
      },
      {
        user_id :"3",
        name : "John Doe",
        img : null,
        dummy_img : "JD",
        email : "johndoe@gmail.com"
      },
    ]
  }

  projectDetails : any = null;

  durationInSeconds = 2;

  searchQuery : any = null;

  addOnBlur = true;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  emails: Email[] = [];

  @ViewChild('close') closebtn : ElementRef | undefined;


  ngOnInit(): void {
    this._dsService.getMembersDetails(this.route.snapshot.paramMap.get('projectId')).subscribe(
      (data : any) => {
        this.projectDetails = data.data;
      },
      (err : any) =>{
        this.projectDetails = this.dummyProjectDetails
      }
    )
  }

  openSnackBar() {
    this._snackBar.open('Invites sent Successfully!!', '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: this.durationInSeconds * 1000,
      panelClass: ['my-snack-bar']
    });
  }


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.emails.push({mail: value});
    }

    event.chipInput!.clear();
  }

  remove(email: Email): void {
    const index = this.emails.indexOf(email);

    if (index >= 0) {
      this.emails.splice(index, 1);
    }
  }


  removeMember(user_id : any){
    //backend call to remove member
    this._dsService.removeMember(this.route.snapshot.paramMap.get('projectId'), user_id).subscribe(
      (data : any) => {
        console.log(data)
      })
    //remove from frontend
    this.projectDetails.members = this.projectDetails.members.filter((member: any) => member.user_id !== user_id)
  }

  sendInvites(){
    // backend call to send invites
    this._dsService.inviteUser(this.projectDetails,this.emails).subscribe(
      (data : any) => {
        console.log(data)
        this.refresh()
        this.closebtn?.nativeElement.click()
        this.openSnackBar()
    })
  }

  refresh(){
    this.emails = []
  }

}
