import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TagsService } from '../tags.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['../app.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class TagInputComponent {

  constructor(private tagsService: TagsService, private toastr: ToastrService) {}
  tagName: string = '';
  tagCode: string = '';
  tags: any[] = [];
  updateTagCode() {
    this.tagCode = this.tagName.replace(/\s+/g, '_').toLowerCase();
  }

  ngOnInit(){
    this.fetchTags();
  }

  addTag(){
    const inputObj = {
      tag_name: this.tagName,
      tag_code: this.tagCode
    }

    this.tagsService.addTag(inputObj).subscribe((response:any) => {
      console.log(response, 'response after adding tags');
      if (response && response.success){
        this.tagName = '';
        this.tagCode = '';
        this.fetchTags();
      }
    })
  }

  fetchTags(){
    this.tagsService.fetchTags().subscribe((response: any) => {
      console.log(response, 'response after fetching tags');
      if (response && response.success){
        this.tags = response.data;
      } else {
        this.toastr.error(response.message);
      }
      (error: any) => {
        this.toastr.error('Something went wrong');
      }
    })
  }
}

