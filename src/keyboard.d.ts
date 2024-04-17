// kle-serial.d.ts
declare module '@ijprest/kle-serial' {
  /// 键模型
  export interface KeyModel {
    /// 键颜色
    color: string;
    /// 文本 共12个
    labels: string[];
    /// 文本颜色 对应为本坐标
    textColor: Array<string | undefined>;
    /// 文本大小 对应为本坐标
    textSize: Array<number | undefined>;
    /// 默认设置
    default: { textColor: string; textSize: number };
    /// 主X坐标 1 U标准
    x: number;
    /// 主Y坐标 1 U保准
    y: number;
    /// 主宽度 1 U标准
    width: number;
    /// 主高度 1 U标准
    height: number;
    /// 副X坐标 1 U标准
    x2: number;
    /// 副Y坐标 1 U标准
    y2: number;
    /// 副宽度 1 U标准
    width2: number;
    /// 副高度 1 U标准
    height2: number;

    /// X 轴旋转
    rotation_x: number;
    /// Y 轴旋转
    rotation_y: number;
    /// 旋转角度
    rotation_angle: number;

    decal: boolean;
    ghost: boolean;
    stepped: boolean;
    nub: boolean;

    profile: string;

    sm: string; // switch mount
    sb: string; // switch brand
    st: string; // switch type
  }

  /// 键盘元数据
  export interface KeyboardMetadataModel {
    /// 作者
    author: string;
    /// 背景色
    backcolor: string;
    /// 自定义背景
    background: { name: string; style: string } | null;
    /// 名称
    name: string;

    notes: string;

    radii: string;

    switchBrand: string;
    switchMount: string;
    switchType: string;
  }

  /// 键盘模型
  export interface KeyboardModel {
    /// 键盘元数据
    meta: KeyboardMetadataModel;
    /// 键
    keys: KeyModel[];
  }

  declare namespace Serial {
    /// 解包
    export function deserialize(data: any): KeyboardModel;

    /// 转换
    export function parse(data: string): KeyboardModel;
  }
}
