import {
  ChangeDetectorRef,
  Directive,
  Injector,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { isPlatformBrowser } from '@angular/common';
import { MatSelectCaseService } from './mat-select-case.service';
import { MatSelectCaseConfigs } from './mat-select-case-configs';

@Directive()
export class MatSelectCaseMediaTracker implements OnDestroy, OnInit {
  mobileQuery!: MediaQueryList;
  onChangeMediaTracker!: () => void;
  media: MediaMatcher;
  configs: MatSelectCaseConfigs;
  private _mobileQueryListenerFunc: any;
  public platformId: any;
  private _mobileQueryListener = () => {
    if (this.onChangeMediaTracker) this.onChangeMediaTracker();
  };

  protected constructor(injector: Injector) {
    this.configs = injector.get(MatSelectCaseService).configs;
    this.media = injector.get(MediaMatcher);
    this.platformId = injector.get(PLATFORM_ID);
    if (isPlatformBrowser(this.platformId)) {
      this._mobileQueryListener();
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.mobileQuery.removeListener(this._mobileQueryListenerFunc);
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.mobileQuery = this.media.matchMedia(
        '(max-width: ' + this.configs.maxWidthForMobileView + 'px)'
      );
      this._mobileQueryListenerFunc = this._mobileQueryListener.bind(this);
      this.mobileQuery.addListener(this._mobileQueryListenerFunc);
      this.onChangeMediaTracker();
    }
  }
}
