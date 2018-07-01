import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

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

  putImage(data: any, file: any): Observable<any> {
    const url = this.makeUrl('image.image', '?token=' + this.helpersService.getToken());

    const formData = new FormData();

    formData.append('file', file);

    for (const prop in data) {
      if (data.hasOwnProperty(prop)) {

        formData.append(prop, data[prop]);
      }
    }

    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true,
      headers: new HttpHeaders({ 'enctype': 'multipart/form-data', 'X-Requested-With': 'XMLHttpRequest' })
    });

    return this.http
      .request(req)
      .pipe(catchError(error => this.handleError(error)));
  }

  getImages(): Observable<any> {
    const url = this.makeUrl('image.images');

    return this.http
      .get(url, this.options)
      .pipe(catchError(error => this.handleError(error)));
  }

  getEdit(image: string): Observable<any> {
    const url = this.makeUrl('image.edit', image);

    return this.http
      .get(url, this.options)
      .pipe(catchError(error => this.handleError(error)));
  }

  postImage(u_id: string, data: any): Observable<any> {
    const url = this.makeUrl('image.edit', u_id);

    return this.http
      .post(url, JSON.stringify(data), this.options)
      .pipe(catchError(error => this.handleError(error)));
  }

  deleteImage(u_id: string): Observable<any> {
    const url = this.makeUrl('image.image', u_id);

    return this.http
      .delete(url, this.options)
      .pipe(catchError(error => this.handleError(error)));
  }
}
