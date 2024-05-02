import { Injectable } from '@angular/core';
import { Size } from './model';
import * as kle from '@ijprest/kle-serial';
import { UNIT_1 } from '../constants/keyboard';

/// 键盘的业务逻辑
/// 计算键盘的大小等
@Injectable()
export class KeyboardService {
  /// 计算键盘尺寸
  /// 计算方式，获取所有的Y轴， Y代表了每一行的按键
  /// 取得每一行最大的X轴 + 按键的尺寸 = 左右边的X轴
  /// 取得最大的X轴 就是键盘的宽度
  /// 取得最大的Y轴 就是键盘的高度
  computeKeyboardSize(keys: kle.KeyModel[]): Size {


        console.log(keys);

    // Reduce所有按键 把他们的X+WIDTH 和 Y+HEIGHT 转换为修正后的X和Y 并取各自的最大值
    const keyCoodinate = keys.reduce(
      (prev, key) => {
        // 取得最大的X轴
        const x = Math.max(
          (key.x ?? 0) + (key.width ?? 0),
          (key.x2 ?? 0) + (key.width2 ?? 0)
        );

        // console.log(`x:${key.x} width:${key.width} x2:${key.x2} width2:${key.width2} - result:${x}`)

        // 取得最大的Y轴
        const y = Math.max(
          (key.y ?? 0) + (key.height ?? 0),
          (key.y2 ?? 0) + (key.height2 ?? 0)
        );

        // console.log(`y:${key.y} height:${key.height} y2:${key.y2} height2:${key.height2} - result:${y}`)

        // 返回
        return {
          x: Math.max(prev.x, x),
          y: Math.max(prev.y, y),
        };
      },
      { x: 0, y: 0 } // 初始坐标
    );

    console.log(keyCoodinate);

    // 这个大小没有经过修正 因此需要*1U
    return {
      width: keyCoodinate.x * UNIT_1 ,
      height: keyCoodinate.y * UNIT_1,
    };
  }
}
