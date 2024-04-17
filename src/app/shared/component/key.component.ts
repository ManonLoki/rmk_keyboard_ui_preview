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

@Component({
  selector: 'app-key',
  standalone: true,
  imports: [],
  templateUrl: './key.component.html',
  styleUrl: './key.component.scss',
})
export class KeyComponent implements AfterViewInit {
  /// 配置
  @Input()
  config?: kle.KeyModel;

  /// Renderer2
  private readonly renderer2 = inject(Renderer2);

  /// 按键宿主
  private readonly hostElementRef = inject(ElementRef);

  /// 键盘盒子1
  @ViewChild('keyBox1')
  private readonly keyBox1ElementRef = inject(ElementRef);

  ngAfterViewInit(): void {
    this.renderer2.setStyle(
      this.hostElementRef.nativeElement,
      'top',
      `${this.config!.y * KEY_Y_1U}px`
    );
    this.renderer2.setStyle(
      this.hostElementRef.nativeElement,
      'left',
      `${this.config!.x * KEY_X_1U}px`
    );

    this.renderer2.setStyle(
      this.keyBox1ElementRef.nativeElement,
      'width',
      `${this.config!.width * KEY_WIDTH_1U - 2 * KEY_PADDING}px`
    );
    this.renderer2.setStyle(
      this.keyBox1ElementRef.nativeElement,
      'height',
      `${this.config!.height * KEY_HEIGHT_1U - 2 * KEY_PADDING}px`
    );

    this.renderer2.setStyle(
      this.keyBox1ElementRef.nativeElement,
      'border',
      `1px solid ${this.config!.color}`
    );
  }
}
