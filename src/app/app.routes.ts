import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagInputComponent } from './tag-input/tag-input.component';
import { ValueInputComponent } from './value-input/value-input.component';
import { DocumentUploadComponent } from './document-upload/document-upload.component';

export const routes: Routes = [
  { path: '', redirectTo: '/tag-input', pathMatch: 'full' },
  { path: 'tag-input', component: TagInputComponent },
  { path: 'value-input', component: ValueInputComponent },
  { path: 'document-upload', component: DocumentUploadComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes { }
