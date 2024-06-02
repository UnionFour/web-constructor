import { Component } from '@angular/core';
import { SettingsBaseComponent } from "../settings.base.component";
import { FormArray, FormGroup } from "@angular/forms";
import { TuiEditorTool } from "@tinkoff/tui-editor";
import { littleToolSet } from "../../fixtures/tui-editor-tools-set.fixture";
import { getAsFormGroup } from "../../utils/utils";
import { getAsFormControl } from "../../utils/utils";

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

    protected createForm(): FormGroup {
        const newsFormArray = new FormArray<any>([]);
        this.site.news?.news.forEach((news) => {
            const newsForm = this.fb.group({
                img: [news.img],
                title: [news.title],
                text: [news.text]
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
            text: ['']
        }));
    }

    public deleteNews(index: number) {
        this.newsFormArray.removeAt(index);
    }

    protected saveSiteSettings(value: any) {
        this.site.news = this.form.value;
    }
}
