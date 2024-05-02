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

import { NgStyle } from '@angular/common';
import { KeyService } from './key.service';
import { KeyBody } from './model';

@Component({
  selector: 'app-key',
  standalone: true,
  imports: [NgStyle],
  providers: [KeyService],
  templateUrl: './key.component.html',
  styleUrl: './key.component.scss',
})
export class KeyComponent implements AfterViewInit {
  /// 配置
  @Input()
  key?: kle.KeyModel;

  /// 真实的键体模型
  private keyBody?: KeyBody;

  /// Renderer2
  private readonly renderer2 = inject(Renderer2);

  /// KeyService
  private readonly keyService = inject(KeyService);

  /// 按键宿主
  private readonly hostElementRef = inject(ElementRef);

  /// 键盘盒子1
  @ViewChild('keyBox1')
  private readonly keyBox1ElementRef = inject(ElementRef);

  /// 键盘盒子2
  @ViewChild('keyBox2')
  private readonly keyBox2ElementRef = inject(ElementRef);

  ngAfterViewInit(): void {
    this.redraw();
  }

  /// 重绘
  private redraw() {
    if (this.key) {
      this.keyBody = this.keyService.computeKeyBody(this.key!);
      this.redrawPosition();
      this.redrawBox();
    }
  }

  /// 重绘按键
  private redrawPosition() {
    /// 默认取Box1的坐标为键盘的坐标
    const coordinate = this.keyBody!.coordinate;
    this.renderer2.setStyle(
      this.hostElementRef.nativeElement,
      'left',
      `${coordinate.x}px`
    );
    // 绘制坐标
    this.renderer2.setStyle(
      this.hostElementRef.nativeElement,
      'top',
      `${coordinate.y}px`
    );
  }

  private redrawBox() {
    /// 绘制第一个盒子
    // 尺寸
    this.renderer2.setStyle(
      this.keyBox1ElementRef.nativeElement,
      'width',
      `${this.keyBody?.box1.size.width}px`
    );
    this.renderer2.setStyle(
      this.keyBox1ElementRef.nativeElement,
      'height',
      `${this.keyBody?.box1.size.height}px`
    );

    // 坐标
    this.renderer2.setStyle(
      this.keyBox1ElementRef.nativeElement,
      'left',
      `${this.keyBody!.box1.coordinate.x }px`
    );
    this.renderer2.setStyle(
      this.keyBox1ElementRef.nativeElement,
      'top',
      `${this.keyBody!.box1.coordinate.y}px`
    );


    // Border
    this.renderer2.setStyle(
      this.keyBox1ElementRef.nativeElement,
      'border',
      `1px solid ${this.keyBody?.box1.backgroundColor}`
    );

    // 背景色
    this.renderer2.setStyle(
      this.keyBox1ElementRef.nativeElement,
      'background-color',
      this.keyBody?.box1.backgroundColor
    );

    // 绘制第二个盒子
    // 尺寸
    // this.renderer2.setStyle(
    //   this.keyBox2ElementRef.nativeElement,
    //   'width',
    //   `${this.keyBody?.box2.size.width}px`
    // );
    // this.renderer2.setStyle(
    //   this.keyBox2ElementRef.nativeElement,
    //   'height',
    //   `${this.keyBody?.box2.size.height}px`
    // );
    // this.renderer2.setStyle(
    //   this.keyBox2ElementRef.nativeElement,
    //   'border',
    //   `1px solid ${this.keyBody?.box2.backgroundColor}`
    // );
    // this.renderer2.setStyle(
    //   this.keyBox2ElementRef.nativeElement,
    //   'background-color',
    //   this.keyBody?.box2.backgroundColor
    // );

    // // // 坐标
    // this.renderer2.setStyle(
    //   this.keyBox2ElementRef.nativeElement,
    //   'left',
    //   `${this.keyBody!.box2.coordinate.x - this.keyBody!.coordinate.x}px`
    // );



    // this.renderer2.setStyle(
    //   this.keyBox2ElementRef.nativeElement,
    //   'top',
    //   `${this.keyBody!.box2.coordinate.y - this.keyBody!.coordinate.y}px`
    // );
  }
}
