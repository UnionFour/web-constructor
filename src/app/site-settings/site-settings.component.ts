import { Component } from '@angular/core';
import { SiteInterface } from "../interfaces/site.interface";
import { DefaultThemes } from "../fixtures/themes.fixture";

@Component({
    selector: 'app-site-settings',
    templateUrl: './site-settings.component.html',
    styleUrls: ['./settings.scss']
})
export class SiteSettingsComponent {
    public site: SiteInterface = {
        themeVariables: DefaultThemes[0].themeVariables,
        main: {
            img: './src/assets/images/no_photo.jpg',
            title: 'Школа Кобальт',
            text: '<h1>Школа Кобальт - лучший выбор для вас и вашего ребёнка!</h1><p>Звоните нам прямо сейчас!</p>',
        },
        news: {
            title: 'Наши новости',
            news: [
                {
                    img: './src/assets/images/no_photo.jpg',
                    title: 'Новость1',
                    text: '<h1>Школа Кобальт - лучший выбор для вас и вашего ребёнка!</h1><p>Звоните нам прямо сейчас!</p>',
                },
                {
                    img: './src/assets/images/no_photo.jpg',
                    title: 'Новость2',
                    text: '<h1>Школа Кобальт - лучший выбор для вас и вашего ребёнка!</h1><p>Звоните нам прямо сейчас!</p>',
                }
            ]
        }
    };
}
