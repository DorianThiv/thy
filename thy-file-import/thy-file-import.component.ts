import { Component } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { MatDialogRef } from '@angular/material/dialog';
import { ThyFileImportService } from './thy-file-import.service';
import { ThyDialogsService } from '../thy-dialogs/thy-dialogs.service';
import { ThyTranslateService } from '../thy-translate';

@Component({
  selector: 'app-thy-file-import',
  templateUrl: './thy-file-import.component.html',
  styleUrls: ['../thy-styles/thy-style.scss', './thy-file-import.component.scss']
})
export class ThyFileImportComponent {

  public file: File;
  public fileSrc: SafeUrl;

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
    this.loading = true;
    const response = await this.service.upload(this.file);
    this.loading = false;
    if (response) {
      this.dialogRef.close(this.file);
    } else {
      this.dialogsService.info({ title: this.translateService.instant('@global-warning'), message: 'Cannot import file.' }).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }

  public close() {
    this.dialogRef.close();
  }

  public async onFileChange(files: FileList) {
    this.file = files ? files.item(0) : null;
    this.fileSrc = this.sanitizer.bypassSecurityTrustUrl(this._urlCreator.createObjectURL(this.file));
  }

}
