import { Component } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { MatDialogRef } from '@angular/material/dialog';
import { ThyFileImportService } from './thy-file-import.service';
import { ThyDialogsService } from '../thy-dialogs/thy-dialogs.service';
import { ThyTranslateService } from '../thy-translate';
import { ThyImage } from './thy-image.class';

@Component({
  selector: 'thy-file-import',
  templateUrl: './thy-file-import.component.html',
  styleUrls: ['./thy-file-import.component.scss']
})
export class ThyFileImportComponent {

  public file: File;
  public fileSrc: SafeUrl;

  private image: ThyImage;
  private _urlCreator = window.URL;

  public loading = false;

  constructor(
    private dialogRef: MatDialogRef<any>,
    private sanitizer: DomSanitizer,
    private dialogsService: ThyDialogsService,
    private service: ThyFileImportService,
    private translateService: ThyTranslateService) {
  }

  public async validate() {
    this.dialogRef.close(this.image);
  }

  public close() {
    this.dialogRef.close();
  }

  public async onFileChange(files: FileList) {
    const file = files ? files.item(0) : null;
    this.file = file;
    let reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = async () => {
      this.image = new ThyImage(file.name, file.type, (reader.result as string).split(',')[1]);
    }
    this.fileSrc = this.sanitizer.bypassSecurityTrustUrl(this._urlCreator.createObjectURL(this.file));
  }

}
