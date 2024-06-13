import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { defaultEditorTools, TuiEditorTool } from "@tinkoff/tui-editor";
import { getAsFormGroup } from "../../utils/utils";
import { getAsFormControl } from "../../utils/utils";
import { SiteWithImagesInterface } from "../../interfaces/site-with-images-interface";

@Component({
    selector: 'app-news-detail',
    templateUrl: './new-detail.component.html',
    styleUrls: ['./new-detail.scss']
})
export class NewDetailComponent implements OnInit {
    @Input() form!: FormGroup;
    @Input() site!: SiteWithImagesInterface;

    readonly tools: TuiEditorTool[] = defaultEditorTools;

    public getAsFormControl = getAsFormControl;
    public readonly getAsFormGroup = getAsFormGroup;

    ngOnInit() {
    }
}
