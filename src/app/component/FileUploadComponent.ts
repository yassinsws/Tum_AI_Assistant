import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {faFileArrowUp, faFileUpload, faMicrophone, faPaperPlane, faUpload} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'jhi-file-upload',
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"]
})
export class FileUploadComponent {

  fileName = '';
  faUpload = faUpload;

  constructor(private http: HttpClient) {
  }

  onFileSelected(event: any) {

    const file: File = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result);
    }
    fileReader.readAsText(file);
    // if (file) {
    //
    //   this.fileName = file.name;
    //   const formData = new FormData();
    //   formData.append("thumbnail", file);
    //   console.dir(formData);
    //   const upload$ = this.http.post("/api/thumbnail-upload", formData);
    //   upload$.subscribe();
    // }
  }

  protected readonly faPaperPlane = faPaperPlane;
  protected readonly faMicrophone = faMicrophone;
  protected readonly faFileUpload = faFileUpload;
  protected readonly faFileArrowUp = faFileArrowUp;
}
