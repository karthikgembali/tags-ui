import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TagsService } from '../tags.service';
import { ToastrService } from 'ngx-toastr';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
declare var $: any;
@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['../app.component.css'],
  imports: [FormsModule, CommonModule, NgxExtendedPdfViewerModule],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DocumentUploadComponent {
  openModal: boolean = false;
  constructor(private tagsService: TagsService, private toastr: ToastrService) {}

  file: any;
  tags: any[] = [];
  formData: FormData = new FormData();
  pdfUrl: string | null = null;

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

  handleFile(event: any) {
    console.log(event, 'event');
    if (event && event.target && event.target.files && event.target.files.length > 0){
      const extension = event.target.files[0]?.name.split(".").pop()
      if (extension === 'docx'){
        this.file = event.target.files[0];
      } else {
        this.toastr.error('Please upload a valid file');
      }
    } else {
      this.toastr.error('Please upload a file');
    }
  }

  uploadFile() {
    if (this.file){
      this.formData.append('file', this.file);
      this.tagsService.uploadFile(this.formData).subscribe((response: any) => {
        console.log(response, 'response after uploading file');
        this.pdfUrl = '';
        this.formData = new FormData();
        if (response && response.success){
          this.pdfUrl = response.dataUrl
          this.toastr.success('File processed successfully');
        } else {
          this.toastr.error('Failed to upload file');
        }
      })
    } else {
      this.toastr.error('Please upload a file');
    }
  }

  copyTagCode(tagCode: string) {
    const value = `<${tagCode}>`
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

  previewFile() {
    this.openModal = true
    // Logic to preview the uploaded file
  }

  closeModal() {
    this.openModal = false;
  }

}


