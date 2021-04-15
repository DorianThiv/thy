import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { ThyKeyCode } from '../../thy-utils-functions/thy-keycode.constants';

export abstract class ThyDialogBase {

    public longLoading = false;
    public loading = false;

    protected result: any;

    constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data?: any) {
        this.dialogRef.keydownEvents().subscribe((event: KeyboardEvent) => this.onKeydown(event));
    }

    protected abstract initialize(): void;

    protected initializeLists() {
    }

    protected initializeFields() {
    }

    public async validate() {
        this.loading = true;
        let isLoaded = false;
        setTimeout(() => {
            if (!isLoaded) {
                this.longLoading = true;
            }
        }, 3000);
        if (await this.beforeClose()) {
            this.dialogRef.close(this.result);
        }
        isLoaded = true;
        this.loading = false;
        this.longLoading = false;
    }

    public close() {
      this.dialogRef.close();
    }

    /**
     * @summary Called in `valdiate()` method to do network actions before close dialog.
     *
     * @description In the case return `false` => `validate()` do nothing.
     * In the case return `true` => `validate()` close dialog.
     */
    protected async beforeClose(): Promise<boolean> {
        return true;
    }

    public onKeydown(event: any) {
        if (event.keyCode === ThyKeyCode.Enter) {
            if (event.path && event.path[0] && event.path[0].nextElementSibling && event.path[0].nextElementSibling.localName === 'mat-autocomplete') { return; }
            if (event.path && event.path[0] && event.path[0].localName === 'mat-select') { return; }
            if (event.path && event.path[0] && event.path[0].localName === 'textarea') { return; }
            event.preventDefault();
            this.validate();
        }
    }

}
