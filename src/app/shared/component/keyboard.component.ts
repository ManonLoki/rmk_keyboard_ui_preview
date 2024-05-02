import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import { KeyComponent } from './key.component';
import * as kle from '@ijprest/kle-serial';
import { KeyboardService } from './keyboard.service';
/// 键盘组件
@Component({
  selector: 'app-keyboard',
  standalone: true,
  imports: [KeyComponent],
  providers: [KeyboardService],
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.scss',
})
export class KeyboardComponent implements OnChanges, AfterViewInit {
  /// 键盘信息
  @Input()
  keyboard?: kle.KeyboardModel;

  get keys() {
    return this.keyboard?.keys ?? [];
  }

  /// Renderer2
  private readonly renderer2 = inject(Renderer2);

  /// KeyboardService
  private readonly keyboardService = inject(KeyboardService);

  /// 获取键盘部分
  @ViewChild('keyboardContainer')
  keyboardElementRef!: ElementRef<HTMLDivElement>;

  ngOnChanges(changes: SimpleChanges): void {
    this.reRender();
  }

  ngAfterViewInit(): void {
    this.reRender();
  }

  /// 渲染
  reRender() {
    if (this.keyboard == null) {
      return;
    }

    this.redrawKeyboardSize();
    this.redrawKeyboardDetail();
  }

  /// 绘制键盘尺寸
  private redrawKeyboardSize() {
    const size = this.keyboardService.computeKeyboardSize(this.keyboard!.keys);

    console.log(size);
    this.renderer2.setStyle(
      this.keyboardElementRef.nativeElement,
      'width',
      `${size.width + 20}px`
    );
    this.renderer2.setStyle(
      this.keyboardElementRef.nativeElement,
      'height',
      `${size.height + 20}px`
    );
  }

  /// 绘制键盘详细信息
  private redrawKeyboardDetail() {
    if (this.keyboard?.meta.backcolor) {
      this.renderer2.setStyle(
        this.keyboardElementRef.nativeElement,
        'background-color',
        this.keyboard.meta.backcolor
      );
    }
  }
}
