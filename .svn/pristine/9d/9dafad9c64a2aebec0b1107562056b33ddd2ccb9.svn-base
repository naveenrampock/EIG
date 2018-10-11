import { Contacts } from '../contact-data-model'
import {PipeTransform,Pipe} from '@angular/core'

@Pipe({
    name: 'contactFilter'
})

export class ContactFilterPipe implements PipeTransform{

    transform(value: Contacts[],filterBy:string) : Contacts[]{
        filterBy = filterBy ? filterBy.toLocaleLowerCase():null;
        return filterBy ? value.filter((contact:Contacts) =>
        (contact.FirstName.toLocaleLowerCase().indexOf(filterBy) !== -1) ||
                (contact.FirstName.toLocaleLowerCase().indexOf(filterBy) !== -1) ||
                (contact.FirstName.toLocaleLowerCase().indexOf(filterBy) !== -1) ||
                (contact.FirstName.toLocaleLowerCase().indexOf(filterBy) !== -1) ||
        contact.FirstName.toLocaleLowerCase().indexOf(filterBy) !== -1) :value;
        }
    }