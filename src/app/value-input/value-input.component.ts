import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TagsService } from '../tags.service';

interface Tag {
  name: string;
  code: string;
  value: string;
}

@Component({
  selector: 'app-value-input',
  templateUrl: './value-input.component.html',
  styleUrls: ['../app.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true
})
export class ValueInputComponent {
  tags: any[] = [];

  constructor(private router: Router, private tagsService: TagsService) {
  }

  ngOnInit(){
    this.fetchTags();
  }

  fetchTags(){
    this.tagsService.fetchTags().subscribe((response: any) => {
      console.log(response, 'response after fetching tags');
      if (response && response.success){
        this.tags = response.data;
      }
    })
  }

  submitValues(tags:any) {
    const tagValues:any[] = []
    this.tags.forEach((tag:any) => {
      tagValues.push({
        "tag_code": tag.tag_code,
        "tag_value": tag.tag_value
      })
    })
    console.log(tagValues, 'tagValues');
    this.tagsService.addTagValues(tagValues).subscribe((response:any) => {
      console.log(response, 'response after submitting values')
      if (response && response.success){
        this.fetchTags()
      }
    })
  }
  
}
