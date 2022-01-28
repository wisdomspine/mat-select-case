import { Inject, Injectable, Optional } from '@angular/core';
import {
  MAT_SELECT_CASE_CONFIGS,
  MatSelectCaseConfigs,
} from './mat-select-case-configs';

@Injectable({
  providedIn: 'root',
})
export class MatSelectCaseService {
  configs: MatSelectCaseConfigs;

  constructor(
    @Optional() @Inject(MAT_SELECT_CASE_CONFIGS) _configs: MatSelectCaseConfigs
  ) {
    this.configs = Object.assign(new MatSelectCaseConfigs(), _configs);
  }
}
