import {
  APP_INITIALIZER,
  Injector,
  ModuleWithProviders,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectCaseDirective } from './mat-select-case.directive';
import { MatSelectCaseService } from './mat-select-case.service';
import { MatSelectCaseInitializer } from './mat-select-case-initializer';
import {
  MAT_SELECT_CASE_CONFIGS,
  MatSelectCaseConfigs,
} from './mat-select-case-configs';

export function nInit(matSelectCaseInitializer: MatSelectCaseInitializer) {
  return matSelectCaseInitializer.init();
}

@NgModule({
  declarations: [MatSelectCaseDirective],
  imports: [CommonModule],
  providers: [
    MatSelectCaseInitializer,
    {
      provide: APP_INITIALIZER,
      deps: [MatSelectCaseInitializer],
      useFactory: nInit,
      multi: true,
    },
  ],
  exports: [MatSelectCaseDirective],
})
export class MatSelectCaseModule {
  static forRoot(
    configs?: MatSelectCaseConfigs
  ): ModuleWithProviders<MatSelectCaseModule> {
    if (!configs) {
      configs = new MatSelectCaseConfigs();
    } else {
      configs = Object.assign(new MatSelectCaseConfigs(), configs);
    }
    return {
      ngModule: MatSelectCaseModule,
      providers: [
        { provide: MAT_SELECT_CASE_CONFIGS, useValue: configs },
        MatSelectCaseService,
      ],
    };
  }
}
