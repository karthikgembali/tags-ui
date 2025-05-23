import { Component } from '@angular/core';
import { TagInputComponent } from './tag-input/tag-input.component';
import { ValueInputComponent } from './value-input/value-input.component';
import { DocumentUploadComponent } from './document-upload/document-upload.component';

@Component({
  selector: 'app-root',
  imports: [TagInputComponent, ValueInputComponent, DocumentUploadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})

export class AppComponent {
  title = 'UI';
  currentStep: number = 1;
  nextStep() {
    this.currentStep++;
  }
  previousStep() {
    this.currentStep--;
  }
}
