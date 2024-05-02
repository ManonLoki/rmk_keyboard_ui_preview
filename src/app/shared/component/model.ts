/// 尺寸
export interface Size {
  /// 宽度
  width: number;
  /// 高度
  height: number;
}

/// 坐标
/// 原点(0,0) 屏幕左上角
export interface Coordinate {
  /// X轴位置
  x: number;
  /// Y轴位置
  y: number;
}

/// 键盘布局尺寸
export interface KeyboardLayoutSize {
  /// 宽度
  width: number;
  /// 高度
  height: number;
}

/// 键体盒子
/// 包含大小
/// 坐标
/// 颜色
/// ...
export interface KeyBox {
  /// 尺寸
  size: Size;
  /// 坐标
  coordinate: Coordinate;
  /// 背景色
  backgroundColor: string;
}

/// 键体
export interface KeyBody {
  /// 键体有2个盒子
  /// 1. 键体盒子1 理论上盒子1在盒子2上方
  box1: KeyBox;
  /// 2. 键体盒子2
  box2: KeyBox;
}
