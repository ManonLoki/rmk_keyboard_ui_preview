import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
  inject,
} from '@angular/core';

import * as kle from '@ijprest/kle-serial';
import {
  KEY_HEIGHT_1U,
  KEY_PADDING,
  KEY_WIDTH_1U,
  KEY_X_1U,
  KEY_Y_1U,
} from '../constants/keyboard';
import { KeyboardService } from './keyboard.service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-key',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './key.component.html',
  styleUrl: './key.component.scss',
})
export class KeyComponent implements AfterViewInit {
  /// 配置
  @Input()
  key?: kle.KeyModel;

  /// Renderer2
  private readonly renderer2 = inject(Renderer2);

  /// KeyService
  private readonly keyboardService = inject(KeyboardService);

  /// 按键宿主
  private readonly hostElementRef = inject(ElementRef);

  /// 键盘盒子1
  @ViewChild('keyBox1')
  private readonly keyBox1ElementRef = inject(ElementRef);

  ngAfterViewInit(): void {
    this.redraw();
  }

  /// 获取字体大小
  getFontSize(index: number) {
    const size= this.keyboardService.computeFontSize(index, this.key!);
    return size;
  }
  /// 获取字体颜色
  getFontColor(index: number) {
    const color =  this.key?.textColor?.[index] ?? this.key?.default.textColor;

    return color;
  }

  /// 重绘
  private redraw() {
    this.redrawKey();
    this.redrawKeyBox1();
  }

  /// 重绘按键
  private redrawKey() {
    const position = this.keyboardService.computeKeyPosition(this.key!);
    this.renderer2.setStyle(
      this.hostElementRef.nativeElement,
      'left',
      `${position.x}px`
    );
    // 绘制坐标
    this.renderer2.setStyle(
      this.hostElementRef.nativeElement,
      'top',
      `${position.y}px`
    );
  }

  private redrawKeyBox1() {
    this.renderer2.setStyle(
      this.keyBox1ElementRef.nativeElement,
      'width',
      `${this.key!.width * KEY_WIDTH_1U - 2 * KEY_PADDING}px`
    );
    this.renderer2.setStyle(
      this.keyBox1ElementRef.nativeElement,
      'height',
      `${this.key!.height * KEY_HEIGHT_1U - 2 * KEY_PADDING}px`
    );

    this.renderer2.setStyle(
      this.keyBox1ElementRef.nativeElement,
      'border',
      `1px solid ${this.key!.color}`
    );

    this.renderer2.setStyle(
      this.keyBox1ElementRef.nativeElement,
      "background-color",
      this.key!.color
    )
  }
}
