import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  baseUrl = environment.serverUrl;

  constructor(private http: HttpClient) { }

  getImageList() {
    return this.http.get<string[]>(this.baseUrl + 'image/list');
  }  
}
