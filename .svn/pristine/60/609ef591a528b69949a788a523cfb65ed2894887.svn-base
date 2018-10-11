import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, filterBy: any): any {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
         if (filterBy == undefined) {
             return filterBy ? value.filter((user) =>
               
      user.AccountID.toLocaleLowerCase().indexOf(filterBy) !== -1):value               
     }
         else {
            
                     return filterBy ? value.filter((user) =>
                 
                     user.AccountID.toLocaleLowerCase().indexOf(filterBy) !== -1):value
                 
     
   }
 
 }
   

}
