import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TagsService } from '../tags.service';
declare var $: any;
@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['../app.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true
})
export class DocumentUploadComponent {
  constructor(private tagsService: TagsService) {}

  file: File | null = null;
  tags: any[] = [];

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

  uploadFile(event: any) {
    this.file = event.target.files[0];
  }

  copyTagCode(tagCode: string) {
    const value = `{{ ${tagCode} }}`
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(value).then(() => {
        alert('Copied to clipboard: ' + value);
      }).catch(err => {
        alert('Failed to copy: ' + err);
      });
    } else {
      // fallback for older browsers
      const tempInput = document.createElement('input');
      tempInput.style.position = 'absolute';
      tempInput.style.left = '-9999px';
      tempInput.value = value;
      document.body.appendChild(tempInput);
      tempInput.select();
      try {
        document.execCommand('copy');
        alert('Copied to clipboard: ' + value);
      } catch (err) {
        alert('Failed to copy');
      }
      document.body.removeChild(tempInput);
    }
  }

  processFile() {
    // Logic to process the uploaded file
  }

  previewFile() {
    // Logic to preview the uploaded file
  }

  downloadFile() {
    // Logic to download the processed file
  }
}


