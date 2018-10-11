import { PipeTransform, Pipe } from '@angular/core'

@Pipe({
    name: 'searchFilter'
})

export class SearchFilterPipe implements PipeTransform {

    transform(list: any, queryString: string): any {
        let queryStrings: any;
        if (queryString) {
            queryStrings = queryString.split(' ');
            return list.filter(item => {
                return this.checkForName(item, queryStrings);
            });
        } else {
            return list;
        }
    }

    checkForName(item: any, queryStrings: any): boolean {
        let pass = false;
        for (let query of queryStrings) {
            if (query !== "") {
                pass = pass || this.checkForEach(item, query);
            }
        }
        return pass;
    }

    checkForEach(item: any, query: any): boolean {
        return item.FirstName.toUpperCase().includes(query.toUpperCase()) ||  item.AccountID.toUpperCase().includes(query.toUpperCase()) || item.Position.toUpperCase().includes(query.toUpperCase()) || item.CompanyName.toUpperCase().includes(query.toUpperCase()) ;
    }
}
