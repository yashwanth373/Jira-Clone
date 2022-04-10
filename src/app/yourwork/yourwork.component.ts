import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-yourwork',
  templateUrl: './yourwork.component.html',
  styleUrls: ['./yourwork.component.css']
})
export class YourworkComponent implements OnInit {

  constructor(private _dataService : DataService, private router : Router) { }

  work : any = null;

  issues : any = []

  ngOnInit(): void {
    this._dataService.getWork().subscribe((data : any) => {
      console.log("work api call",data)
      this.work = data.data
      if(this.work != null){
        this.recentSort();
  
        this.seperateIssues();
  
        this.work = this.work.splice(0,5)
      }


      console.log("Your work",this.work)
      console.log("Your issues",this.issues)
    })
    // this.recentSort();

    //   this.seperateIssues();

    //   this.work = this.work.splice(0,5)

    //   console.log(this.work)
    //   console.log(this.issues)
  }

  recentSort(){
    this.work.sort((a : any,b : any) => {
      if(parseInt(a.modifiedAt) < parseInt(b.modifiedAt)){
        return 1;
      }
      else if(parseInt(a.modifiedAt) > parseInt(b.modifiedAt)){
        return -1;
      }
      else{
        return 0;
      }
    })
  }

  seperateIssues(){
    for(let i = 0; i < this.work.length; i++){
      for(let j = 0; j < this.work[i].issues.length; j++){
        this.work[i].issues[j].project_name = this.work[i].project_name;
        this.issues.push(this.work[i].issues[j])
      }
    }
    this.issues.sort((a : any,b : any) => {
      if(parseInt(a.modifiedAt) < parseInt(b.modifiedAt)){
        return 1;
      }
      else if(parseInt(a.modifiedAt) > parseInt(b.modifiedAt)){
        return -1;
      }
      else{
        return 0;
      }
    })
  }

  gotoProject(id:any,tab:any){
    switch(tab){
      case '' :
        this.router.navigate(['/Projects/' + id])
        console.log('gotoProject ',id)
        break;
      case 'roadmap' :
        this.router.navigate(['/Projects/' + id+'/roadmap'])
        console.log("roadmap");
        break;
      case 'code' :
        this.router.navigate(['/Projects/' + id+'/code'])
        console.log("code");
        break;
    }
  }

  gotoProjectsList(){
    this.router.navigate(['/Projects/Projectslist']);
  }

}
