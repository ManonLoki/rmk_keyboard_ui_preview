import { Injectable } from '@angular/core';
import * as kle from '@ijprest/kle-serial';
import { KeyboardLayoutSize } from './model';
import { KEY_HEIGHT_1U, KEY_WIDTH_1U } from '../constants/keyboard';
/// 键盘组件的Service
@Injectable({ providedIn: 'root' })
export class KeyboardService {
  computeLayoutSize(keys: kle.KeyModel[]): KeyboardLayoutSize {
    const x = keys.reduce((max, key) => {
      return Math.max(Math.max(max, key.x), key.x2);
    }, 0);

    const y = keys.reduce((max, key) => {
      return Math.max(Math.max(max, key.y), key.y2);
    }, 0);

    return {
      width: x * KEY_WIDTH_1U + KEY_WIDTH_1U, //额外加出来那个键的大小
      height: y * KEY_HEIGHT_1U + KEY_HEIGHT_1U, // 额外加出来最后一个键的高度
    };
  }
}
