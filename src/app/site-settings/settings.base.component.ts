import { Directive, Input } from '@angular/core';
import { DestroyableComponent } from '../directives/destroyable.component';
import { SiteInterface } from '../interfaces/site.interface';

@Directive()
export abstract class SettingsBaseComponent extends DestroyableComponent {
    @Input() public site?: SiteInterface;
}
