import { Component } from '@angular/core';
import { SiteInterface } from "../interfaces/site.interface";
import { DefaultThemes } from "../fixtures/themes.fixture";

@Component({
    selector: 'app-site-settings',
    templateUrl: './site-settings.component.html',
    styleUrls: ['./settings.scss']
})
export class SiteSettingsComponent { // to do: разделяем файлы и настройки текстом
    // тут дефолтный объект, для использования в случае создания с нуля
    private readonly defaultSite: SiteInterface = {
        navigation: { logoImg: '', companyName: 'Школа спорта', description: 'О нас', news: 'Наши новости', addresses: 'Спортивные залы', instructors: 'Преподаватели', services: 'Услуги' },
        themeVariables: DefaultThemes[0].themeVariables,
        main: { img: '', title: 'О нас', text: '' },
        news: { title: 'Наши новости', news: [{ img: '', title: '', text: '' }] },
        addresses: { title: 'Спортивные залы', addresses: [{description: 'Баскетбол', address: 'ул. Пушкина д. 60', lat: 55.9999, alt: 37.23234}] },
        instructors: { title: 'Преподаватели', instructors: [{ img: '', name: 'Василий Аккордон Васильевич', sportType: 'Баскетбол', info: 'Лучший преподаватель в мире' }] },
        services: { title: 'Услуги', services: [{sportType: '', text: '', address: '', buttonWording: 'Записаться'}] }
    };

    public site: SiteInterface = this.defaultSite;
}
