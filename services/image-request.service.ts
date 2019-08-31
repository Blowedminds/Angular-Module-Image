import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MainRequestService, HelpersService, RoutingListService } from '../imports';

@Injectable()
export class ImageRequestService extends MainRequestService {

  constructor(
    http: HttpClient,
    helpersService: HelpersService,
    routingListService: RoutingListService
  ) {
    super(http, helpersService, routingListService);
  }

  postImage(data: any, file: any): Observable<any> {
    const formData = new FormData();

    formData.append('file', file);

    for (const prop in data) {
      if (data.hasOwnProperty(prop)) {
        formData.append(prop, data[prop]);
      }
    }

    return this.makePostRequestWithProgressReport('image.image', formData);
  }

  getImages(): Observable<any> {
    return this.makeGetRequest('image.images');
  }

  getEdit(image: string): Observable<any> {
    return this.makeGetRequest('image.edit', image);
  }

  putImage(u_id: string, data: any): Observable<any> {
    return this.makePutRequest('image.edit', data, u_id);
  }

  deleteImage(u_id: string): Observable<any> {
    return this.makeDeleteRequest('image.image', u_id);
  }
}
