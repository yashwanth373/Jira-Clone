import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css']
})
export class InvitationComponent implements OnInit {

  constructor(private _dsService : DataService,private route : ActivatedRoute,private router : Router) { }

  project: any = {
    project_name:"Expense Tracker"
  };

  user: any = {};

  alreadyMember : Boolean = false

  invited : Boolean = true;

  ngOnInit(): void {
    let project_id = this.route.snapshot.paramMap.get('projectId');
    this._dsService.getDetails().subscribe((data:any) => {
      this.user = data.user;
      console.log(this.user)
      this._dsService.getProjectDetails(project_id).subscribe(
        (data : any) => {
          this.project = data.data
          
          this.checkMember()
          this.checkInvite()
          console.log("Already Member?",this.alreadyMember)
          console.log("Legit Invite?",this.invited)
        })
    })
  }

  checkMember(){
    let members = this.project.members.map((member:any) => member.email)
    if(members.includes(this.user.email)){
      this.alreadyMember = true
    }
  }

  checkInvite(){
    if(this.project.invited.includes(this.user.email)){
      this.invited = true
    }
  }

  accept(){
    let userDetails = {
      user_id : this.user.user_id,
      name: this.user.name,
      img: this.user.displayPicture,
      dummy_img : this.user.dummy_img,
      email: this.user.email
    }
    this._dsService.acceptInvite(this.project.project_id,userDetails).subscribe(
      (data : any) => {
        if(data.status == "success"){
          this.router.navigate(['/Projects/'+this.project.project_id])
        }
      }
    )
  }
}
