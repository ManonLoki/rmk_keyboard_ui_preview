import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KeyboardComponent } from './shared/component/keyboard.component';
import { LayoutLoader } from './shared/service/layout-loader.service';
import * as kle from '@ijprest/kle-serial';
import {DropdownModule} from "primeng/dropdown"

type KeyboardLayouts = Array<{ name: string; code: string }>;

const LAYOUT_DATA: KeyboardLayouts = [
  {
    name: 'ANSI 104',
    code: 'ANSI_104',
  },
  {
    name: 'ANSI 104(Big Enter)',
    code: 'ANSI_104_BIG_ENTER',
  },
  {
    name: 'Atreus',
    code: 'ATREUS',
  },
  {
    name: 'Custom',
    code: 'CUSTOM',
  },
  {
    name: 'Default 60%',
    code: 'DEFAULT_60',
  },
  {
    name: 'ErgoDox',
    code: 'ERGO_DOX',
  },
  {
    name: 'ISO 60%',
    code: 'ISO_60',
  },
  {
    name: 'ISO 105',
    code: 'ISO_105',
  },
  {
    name: 'JD 40',
    code: 'JD_40',
  },
  {
    name: 'Keycool 84',
    code: 'KEYCOOL_84',
  },
  {
    name: 'Kinesis Advantage',
    code: 'KINESIS_ADVANTAGE',
  },
  {
    name: 'Leopold FC660M',
    code: 'LEOPOLD_FC660M',
  },
  {
    name: 'Planck',
    code: 'PLANCK',
  },
];

import { PrimeNGConfig } from 'primeng/api';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, KeyboardComponent, ReactiveFormsModule,DropdownModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  /// 键盘配列
  keyboard?: kle.KeyboardModel;

  layoutDatasource = LAYOUT_DATA;
  /// 布局选择
  layout = new FormControl(LAYOUT_DATA[0].code);

  private readonly layoutLoader = inject(LayoutLoader);

  private readonly primengConfig = inject(PrimeNGConfig);



  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.loadLayout();
  }

  onLayoutSelectChange(): void {
    this.loadLayout();
  }

  async loadLayout(): Promise<void> {
    this.layoutLoader
      .getKeyboardLayout(this.layout.value!)
      .subscribe((layout) => {
        this.keyboard = layout;
        console.log('keyboard: ', this.keyboard);
      });
  }
}
