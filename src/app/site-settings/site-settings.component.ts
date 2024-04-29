import { Component } from '@angular/core';
import { SiteInterface } from "../interfaces/site.interface";
import { DefaultThemes } from "../fixtures/themes.fixture";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
    selector: 'app-site-settings',
    templateUrl: './site-settings.component.html',
    styleUrls: ['./settings.scss']
})
export class SiteSettingsComponent {
    // тут дефолтный объект, для использования в случае создания с нуля
    private readonly defaultSite: SiteInterface = {
        themeVariables: DefaultThemes[0].themeVariables,
        main: { img: '', title: 'Школа спорта', text: '' },
        news: { title: 'Наши новости', news: [{ img: '', title: '', text: '' }] },
        addresses: { title: 'Спортивные залы', addresses: [{sportType: 'Баскетбол', address: 'ул. Пушкина д. 60'}] },
        instructors: { title: 'Преподаватели', instructors: [{ image: '', name: '', sportType: '', info: '' }] },
        services: { title: 'Услуги', services: [{sportType: '', text: '', address: ''}] }
    };

    public site: SiteInterface = this.defaultSite;
}
