import { Component } from '@angular/core';
import { SiteWithImagesInterface } from "../interfaces/site-with-images-interface";
import { DefaultThemes } from "../fixtures/themes.fixture";
import { BuilderService } from "../services/builder.service";
import { AuthService } from "../services/auth.service";

@Component({
    selector: 'app-site-settings',
    templateUrl: './site-settings.component.html',
    styleUrls: ['./settings.scss']
})
export class SiteSettingsComponent {
    public open = false;
    public loading = false;
    public openInfo = false;
    public isSuccess = false;

    // тут дефолтный объект, для использования в случае создания с нуля
    //  необходимо подхватывать сохраненные изменения
    private readonly defaultSite: SiteWithImagesInterface = {
        navigation: { logoImg: undefined, companyName: 'Школа спорта', description: 'О нас', news: 'Наши новости', addresses: 'Спортивные залы', instructors: 'Преподаватели', services: 'Услуги' },
        themeVariables: DefaultThemes[0].themeVariables,
        main: { img: undefined, title: 'О нас', text: '' },
        news: { title: 'Наши новости', news: [{ img: undefined, title: '', text: '', address: '', date: '', price: 0, maxPlaceCount: 10, busyPlaceCount: 0, phone: '' }] },
        addresses: { title: 'Спортивные залы', addresses: [{description: 'Баскетбол', address: 'ул. Пушкина д. 60', lat: 55.9999, alt: 37.23234}] },
        instructors: { title: 'Преподаватели', instructors: [{ img: undefined, name: 'Василий Аккордон Васильевич', sportType: 'Баскетбол', info: 'Лучший преподаватель в мире' }] },
        services: { title: 'Услуги', services: [{sportType: '', text: '', address: '', buttonWording: 'Записаться'}] }
    };

    public site: SiteWithImagesInterface = this.defaultSite;

    constructor(
        private builder: BuilderService,
        private authService: AuthService,
    ) {
    }

    public onClick(): void {
        this.open = !this.open;
    }

    public onObscured(obscured: boolean): void {
        if (obscured) {
            this.open = false;
        }
    }

    public onActiveZone(active: boolean): void {
        this.open = active && this.open;
    }

    public onLogOut() {
        this.authService.logOut();
    }

    public onBuild() {
        // не очень красиво разделяем изображения и текстовые настройки
        const images: File[] = [];
        const siteSettings: any = structuredClone(this.site);
        this.separationTextAndImages(siteSettings, images);
        const companyName = localStorage.getItem('login') || 'test';

        this.loading = true;
        this.openInfo = true;
        this.builder.build(companyName, siteSettings, images).subscribe(
            () => {
                this.isSuccess = true;
                this.loading = false;
            },
            (e) => {
                this.loading = false;
                this.isSuccess = false;
            }
        );
    }

    private separationTextAndImages(object: any, images: File[], parentKey?: string, grandparent?: string) { // доработать нейминги внутри масивов
        for (const [settingKey, setting] of Object.entries(object)) {
            if (setting instanceof File) {
                const nameParts = setting.name.split('.');
                this.renameFile(setting, `${grandparent || ''}${parentKey}.${nameParts[nameParts.length - 1]}`);
                images.push(setting);
                delete object[settingKey];
            } else if (setting instanceof Array) {
                this.separationTextAndImages(setting, images, settingKey, parentKey);
            } else if (setting instanceof Object) {
                this.separationTextAndImages(setting, images, settingKey, parentKey);
            }
        }
    }

    private renameFile(file: File, newName: string) {
        Object.defineProperty(file, 'name', {
            writable: true,
            value: newName
        });
    }
}
