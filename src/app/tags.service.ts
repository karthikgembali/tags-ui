import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})

export class TagsService {

  constructor(private http: HttpClient) { }


  addTag(tag: any){
    return this.http.post(`${environment.apiUrl}/addTags`, tag);
  }

  fetchTags(){
    return this.http.get(`${environment.apiUrl}/fetchTags`);
  }

  addTagValues(tagValues: any){
    return this.http.post(`${environment.apiUrl}/addTagValues`, tagValues);
  }

  uploadFile(formData: FormData){
    return this.http.post(`${environment.apiUrl}/replaceTagsInFile`, formData);
  }
}
