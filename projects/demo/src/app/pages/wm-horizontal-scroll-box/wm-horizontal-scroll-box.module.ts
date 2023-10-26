import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WmHorizontalScrollBoxComponent} from './wm-horizontal-scroll-box.component';
import {WmHorizontalScrollBoxRoutingModule} from './wm-horizontal-scroll-box-routing.module';
import {WmCoreModule} from 'wm-core/wm-core.module';
import {SharedModule} from '../../shared/shared.module';
@NgModule({
  declarations: [WmHorizontalScrollBoxComponent],
  imports: [CommonModule, WmHorizontalScrollBoxRoutingModule, WmCoreModule, SharedModule],
  exports: [WmHorizontalScrollBoxComponent],
})
export class WmHorizontalScrollBoxModule {}
