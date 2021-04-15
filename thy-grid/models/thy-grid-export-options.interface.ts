import { ThyFileSaverService } from "../../thy-file-saver/thy-file-saver.service";


export interface ThyGridExportOptions {
    properties: string[];
    fileSaver: ThyFileSaverService;
    list?: any[];
    titles?: string[];
    filename?: string;
    delimiter?: string;
}
