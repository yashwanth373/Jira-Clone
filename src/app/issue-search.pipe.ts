import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'issueSearch'
})
export class IssueSearchPipe implements PipeTransform {

  transform(issues: any, searchQuery : any): any {
    if(!issues) return [];
    if(!searchQuery) return issues;
    searchQuery = searchQuery.toLowerCase();
    let filteredIssues = issues.filter( (issue : any) => {
      return issue.name.toLowerCase().includes(searchQuery);
    });
    return filteredIssues;
  }

}
