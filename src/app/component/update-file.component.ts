import {Component} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ChatbotService} from "./chatbot.service";

@Component({
  selector: 'jhi-update-file',
  templateUrl: 'update-file.component.html',
  styleUrl: 'update-file.component.scss',
})
export class UpdateFileComponent {

  updateForm = new FormGroup({
    source: new FormControl('', [Validators.required]),
    contact: new FormControl(''),
    }
  );

  formData = new FormData();

  fileName = '';

  success = false;

  constructor(
    private chatbotService: ChatbotService,
  ) {
  }



  onFileSelected(event: any) {

    const file: File = event.target.files[0];

    if (file) {

      this.fileName = file.name;

      this.formData.append("file-upload", file);
    }
  }

  uploadFile(): void {
    let sourceUrl = this.updateForm.get(["source"])!.value;
    let contactPerson = this.updateForm.get(["contact"])!.value;

    this.formData.append("contact", contactPerson);
    this.formData.append("source", sourceUrl);

    this.chatbotService.instructorUploadFile(this.formData).subscribe(
      (result) => {
        console.log(result.body!);
      },
      error => {
        console.log(error);
      });
  }
}
