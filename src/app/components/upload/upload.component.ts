import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';

function getBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
})

export class UploadComponent implements OnInit {

  @Input() private imageMetaData; // todo: свой интерфейс
  @Input() disabled: boolean;
  @Output() changeImage = new EventEmitter();
  fileList: NzUploadFile[] = [];
  previewImage: string | undefined = '';
  previewVisible = false;

  handlePreview = async (file: NzUploadFile) => {
    if (!file.url && !file.preview) {
      // tslint:disable-next-line:no-non-null-assertion
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  }

  constructor() {
  }

  ngOnInit(): void {
    if (this.imageMetaData) {
      this.fileList.push(this.imageMetaData.file as NzUploadFile);
    }
  }

  change(image): void {
    this.changeImage.emit(image);
  }

}
