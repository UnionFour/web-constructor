import { Component, Inject } from '@angular/core';
import { SettingsBaseComponent } from "../settings.base.component";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { TuiEditorTool } from "@tinkoff/tui-editor";
import { littleToolSet } from "../../fixtures/tui-editor-tools-set.fixture";
import { getAsFormGroup } from "../../utils/utils";
import { getAsFormControl } from "../../utils/utils";
import { TuiDialogService } from "@taiga-ui/core";

@Component({
    selector: 'app-news-settings',
    templateUrl: './news-settings.component.html',
    styleUrls: ['./news-settings.scss']
})
export class NewsSettingsComponent extends SettingsBaseComponent {
    readonly tools: TuiEditorTool[] = littleToolSet;
    public getAsFormControl = getAsFormControl;

    public readonly getAsFormGroup = getAsFormGroup;
    public newsFormArray: FormArray = new FormArray<any>([]);
    public selectedNew?: FormGroup;

    constructor(
        protected formBuilder: FormBuilder,
        @Inject(TuiDialogService) private readonly dialogs: TuiDialogService
    ) {
        super(formBuilder);
    }

    protected createForm(): FormGroup {
        const newsFormArray = new FormArray<any>([]);
        this.site.news?.news.forEach((news) => {
            const newsForm = this.fb.group({
                img: [news.img],
                title: [news.title],
                text: [news.text],
                date: [news.date || '24.06.2024, 12:30'],
                address: [news.address],
                price: [news.price],
                maxPlaceCount: [news.maxPlaceCount],
                busyPlaceCount: [news.busyPlaceCount],
                phone: [news.phone]
            });
            newsFormArray.push(newsForm);
        });
        this.newsFormArray = newsFormArray;

        return this.fb.group({
            title: [this.site.news?.title],
            news: newsFormArray
        });
    }

    public createNews() {
        this.newsFormArray.push(this.fb.group({
            img: [''],
            title: [''],
            text: [''],
            date: ['24.06.2024, 12:30'],
            address: [''],
            price: [0],
            maxPlaceCount: [0],
            busyPlaceCount: [0],
            phone: ['']
        }));
    }

    public openModal(index: number, template: any) {
        this.selectedNew = this.newsFormArray.at(index) as FormGroup;
        this.dialogs.open(template).subscribe();
    }

    public deleteNews(index: number) {
        this.newsFormArray.removeAt(index);
    }

    protected saveSiteSettings(value: any) {
        this.site.news = this.form.value;
        console.log(this.site.news);
    }
}
