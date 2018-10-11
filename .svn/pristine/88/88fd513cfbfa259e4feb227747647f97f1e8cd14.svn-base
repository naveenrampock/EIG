import { CacheServer } from '../dicom-data-modal';
import {PipeTransform,Pipe} from '@angular/core'

@Pipe({
    name: 'cacheFilter'
})

export class CacheFilterPipe implements PipeTransform{

    transform(value: CacheServer[],filterBy:string) : CacheServer[]{
        filterBy = filterBy ? filterBy.toLocaleLowerCase():null;
        return filterBy ? value.filter((CacheServer:CacheServer) =>
        (CacheServer.Name.toLocaleLowerCase().indexOf(filterBy) !== -1) ||
                (CacheServer.MaxStorageSize.toLocaleLowerCase().indexOf(filterBy) !== -1) ||
                (CacheServer.UsedStorageSize.toLocaleLowerCase().indexOf(filterBy) !== -1) ||
                CacheServer.FolderPath.toLocaleLowerCase().indexOf(filterBy) !== -1) :value;
        }
    }