import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

/// 数据API
@Injectable({ providedIn: 'root' })
export class DataAPI {
  /// 注入HTTP客户端
  private readonly http = inject(HttpClient);
  /// 获取键盘布局
  public getKeyboardLayout(name: string): Observable<any> {
    return this.http.get(`/assets/${name}.json`);
  }
}
