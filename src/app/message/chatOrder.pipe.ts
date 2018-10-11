import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chatOrder'
})
export class ChatOrderPipe implements PipeTransform {

  transform(msgs: any): any {
    msgs.sort((a: any, b: any) => {
        let left = Number(new Date(a['CreatedDate']));
        let right = Number(new Date(b['CreatedDate']));
        return left - right;
    });
    return msgs; 
 }
}