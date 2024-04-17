import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import * as kle from '@ijprest/kle-serial';
import { DataAPI } from '../api/data.api';

/// 布局加载器
@Injectable({providedIn:"root"})
export class LayoutLoader {
  /// 数据API
  private readonly dataAPI = inject(DataAPI);

  /// 获取键盘布局
  public getKeyboardLayout(name: string): Observable<kle.KeyboardModel> {
    return this.dataAPI.getKeyboardLayout(name).pipe(
      map((data) => {
        if (typeof data === 'string') {
          return kle.Serial.parse(data);
        } else {
          return kle.Serial.deserialize(data);
        }
      })
    );
  }
}
