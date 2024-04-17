import { Injectable } from '@angular/core';
import * as kle from '@ijprest/kle-serial';
import { KeyboardLayoutSize } from './model';
import {
  KEY_HEIGHT_1U,
  KEY_PADDING,
  KEY_TEXT_BASIC_SIZE,
  KEY_WIDTH_1U,
} from '../constants/keyboard';

/// 键坐标
export interface KeyPosition {
  x: number;
  y: number;
}
/// 键尺寸
export interface KeySize {
  width: number;
  height: number;
}

/// 键盘组件的Service
@Injectable({ providedIn: 'root' })
export class KeyboardService {
  /// 计算键盘的大小
  computeKeyboardSize(keys: kle.KeyModel[]): KeyboardLayoutSize {
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

  /// 计算按键坐标
  computeKeyPosition(key: kle.KeyModel): KeyPosition {
    return {
      x: key.x * KEY_WIDTH_1U,
      y: key.y * KEY_HEIGHT_1U,
    };
  }

  /// 计算按键块1大小
  computeKeyBox1Size(key: kle.KeyModel): KeyboardLayoutSize {
    return {
      width: key.width * KEY_WIDTH_1U - KEY_PADDING * 2,
      height: key.height * KEY_HEIGHT_1U - KEY_PADDING * 2,
    };
  }

  /// 计算按键块2大小
  computeKeyBox2Size(key: kle.KeyModel): KeyboardLayoutSize {
    return {
      width: key.width2 * KEY_WIDTH_1U - KEY_PADDING * 2,
      height: key.height2 * KEY_HEIGHT_1U - KEY_PADDING * 2,
    };
  }

  /// 计算字体大小
  computeFontSize(index: number, key: kle.KeyModel): number {
    const size = key.textSize?.[index] ?? key.default.textSize ?? 0;

    return KEY_TEXT_BASIC_SIZE + size! *2;
  }
}
