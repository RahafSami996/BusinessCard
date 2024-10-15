import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { NgxFileDropModule,FileSystemFileEntry,NgxFileDropEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-business-card-add',
  standalone: true,
  imports: [ReactiveFormsModule,NgxFileDropModule],
  templateUrl: './business-card-add.component.html',
  styleUrl: './business-card-add.component.css'
})
export class BusinessCardAddComponent {
  businessCardForm: FormGroup;
  previewCard: any = null; // Used for preview
  photoPreviewUrl: string | ArrayBuffer | null = null;

  public files: NgxFileDropEntry[] = [];


  constructor(private fb: FormBuilder) {
    this.businessCardForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      photo: [null] // For file input (photo)
    });
  }

  // Called when the form is submitted
  submitForm() {
    if (this.businessCardForm.valid) {
      this.previewCard = this.businessCardForm.value;
      console.log("Business card preview: ", this.previewCard);
    }
  }

  // Preview photo on file upload
  onPhotoChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.photoPreviewUrl = reader.result;
      };
      reader.readAsDataURL(file);
      this.businessCardForm.patchValue({ photo: file });
    }
  }

  // Reset the form and preview
  resetForm() {
    this.businessCardForm.reset();
    this.previewCard = null;
    this.photoPreviewUrl = null;
  }
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;

    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          const reader = new FileReader();
          reader.onload = () => {
            const fileContents = reader.result as string;
            if (file.name.endsWith('.csv')) {
              this.handleCSVFile(fileContents);
            } else if (file.name.endsWith('.xml')) {
              this.handleXMLFile(fileContents);
            } else if (file.name.endsWith('.png') || file.name.endsWith('.jpg')) {
              this.handleQRCodeFile(file); // Use ZXing to scan QR code
            }
          };
          reader.readAsText(file);
        });
      }
    }
  }


  // Handlers for different file types
  handleCSVFile(fileContents: string) {
    // Parse CSV and update form controls with values
    console.log("CSV file contents: ", fileContents);
  }

  handleXMLFile(fileContents: string) {
    // Parse XML and update form controls with values
    console.log("XML file contents: ", fileContents);
  }

  handleQRCodeFile(file: File) {
    // Parse QR code (e.g., using ZXing library)
    console.log("QR Code file uploaded");
  }
}