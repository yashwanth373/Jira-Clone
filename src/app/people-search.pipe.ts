import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'peopleSearch'
})
export class PeopleSearchPipe implements PipeTransform {

  transform(members: any, searchQuery: string): any[] {
    if(!members) return [];
    if(!searchQuery) return members;
    searchQuery = searchQuery.toLowerCase();
    let membersList = this.unwrapMembers(members);
    let filteredMembers = membersList.filter( (mem : any) => {
      return mem.name.toLowerCase().includes(searchQuery);
    });
    let formattedFilteredMembers = this.formatMembers(filteredMembers);
    console.log(formattedFilteredMembers.length)
    return formattedFilteredMembers;
  }

  unwrapMembers(members : any){
    let membersList = []
    for(var i = 0;i<members.length;i++){
      for(var j = 0;j<members[i].length;j++){
        membersList.push(members[i][j])
      }
    }
    return membersList;
  }

  formatMembers(members : any){
    let formattedMembers = []
    let formattedProjectMembersListItem : any = []
    for(var i = 0;i<members.length;i++){
      
      if(i % 6 === 0 && i != 0){
        formattedMembers.push(formattedProjectMembersListItem);
        formattedProjectMembersListItem = []
      }
      formattedProjectMembersListItem.push(members[i])
    }
    formattedMembers.push(formattedProjectMembersListItem);
    console.log("foramatedProjectMembers ", formattedMembers)
    return formattedMembers;
  }

}
