import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'projectSearch'
})
export class ProjectSearchPipe implements PipeTransform {

  transform(projects: any, searchQuery: string): any[] {
    if(!projects) return [];
    if(!searchQuery) return projects;
    searchQuery = searchQuery.toLowerCase();
    let filteredProjects = projects.filter( (pro : any) => {
      return pro.name.toLowerCase().includes(searchQuery);
    });
    console.log(filteredProjects.length)
    return filteredProjects;
  }

}
