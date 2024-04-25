import { Component } from '@angular/core';
import { TuiFileLike } from '@taiga-ui/kit';
import { FormControl } from '@angular/forms';
import { finalize, map, Observable, of, Subject, switchMap, timer } from 'rxjs';
import { defaultEditorTools, TuiEditorTool } from '@tinkoff/tui-editor';

@Component({
    selector: 'app-main-settings',
    templateUrl: './main-settings.component.html',
    styleUrls: ['./main-settings.scss']
})
export class MainSettingsComponent {
    // копипаста из документации тайги
    readonly imageControl = new FormControl();
    readonly descriptionControl = new FormControl();

    readonly tools: TuiEditorTool[] = defaultEditorTools;

    readonly rejectedFiles$ = new Subject<TuiFileLike | null>();
    readonly loadingFiles$ = new Subject<TuiFileLike | null>();
    readonly loadedFiles$ = this.imageControl.valueChanges.pipe(
        switchMap(file => (file ? this.makeRequest(file) : of(null))),
    );

    onReject(file: TuiFileLike | readonly TuiFileLike[]): void {
        this.rejectedFiles$.next(file as TuiFileLike);
    }

    removeFile(): void {
        this.imageControl.setValue(null);
    }

    clearRejected(): void {
        this.removeFile();
        this.rejectedFiles$.next(null);
    }

    makeRequest(file: TuiFileLike): Observable<TuiFileLike | null> {
        this.loadingFiles$.next(file);

        return timer(1000).pipe(
            map(() => {
                if (Math.random() > 0.5) {
                    return file;
                }

                this.rejectedFiles$.next(file);

                return null;
            }),
            finalize(() => this.loadingFiles$.next(null)),
        );
    }
}
