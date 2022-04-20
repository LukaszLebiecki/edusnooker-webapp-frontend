import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LevelListComponent } from './level-list/level-list.component';



@NgModule({
    declarations: [
        LevelListComponent
    ],
    exports: [
        LevelListComponent
    ],
    imports: [
        CommonModule
    ]
})
export class LevelModule { }
