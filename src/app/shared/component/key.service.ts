import { Injectable } from '@angular/core';
import { KeyBody } from './model';
import * as kle from '@ijprest/kle-serial';
import { KEY_PADDING, UNIT_1 } from '../constants/keyboard';
/// 按键的业务逻辑
/// 包含计算位置，大小，颜色等
@Injectable()
export class KeyService {
  /// 计算键体信息

  computeKeyBody(key: kle.KeyModel): KeyBody {
    // 先计算第一个盒子
    // 计算x坐标
    const box1X = (key.x ?? 0) * UNIT_1;
    // 计算y坐标
    const box1Y = (key.y ?? 0) * UNIT_1;
    // 计算宽度 这个要减出去案件之间的间距
    const box1Width = (key.width ?? 0) * UNIT_1 - KEY_PADDING * 2;
    // 计算高度 这个要减出去案件之间的间距
    const box1Height = (key.height ?? 0) * UNIT_1 - KEY_PADDING * 2;

    // 创建第一个盒子
    const box1 = {
      size: {
        width: box1Width,
        height: box1Height,
      },
      coordinate: {
        x: box1X,
        y: box1Y,
      },
      backgroundColor: key.color ?? '#000000',
    };

    // 计算第二个盒子
    // 计算x坐标
    const box2X = (key.x2 ?? 0) * UNIT_1;
    // 计算y坐标
    const box2Y = (key.y2 ?? 0) * UNIT_1;
    // 计算宽度 这个要减出去案件之间的间距
    const box2Width = (key.width2 ?? 0) * UNIT_1 - KEY_PADDING * 2;
    // 计算高度 这个要减出去案件之间的间距
    const box2Height = (key.height2 ?? 0) * UNIT_1 - KEY_PADDING * 2;
    // 创建第二个盒子
    const box2 = {
      size: {
        width: box2Width,
        height: box2Height,
      },
      coordinate: {
        x: box2X,
        y: box2Y,
      },
      backgroundColor: key.color ?? '#000000',
    };

    // 返回
    return {
      box1,
      box2,
    };
  }
}
