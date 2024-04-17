import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KeyboardComponent } from './shared/component/keyboard.component';
import { LayoutLoader } from './shared/service/layout-loader.service';
import * as kle from "@ijprest/kle-serial"
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, KeyboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{

  keyboard?: kle.KeyboardModel;

  private readonly layoutLoader = inject(LayoutLoader);

  ngOnInit(): void {
    this.layoutLoader.getKeyboardLayout('ANSI_104').subscribe((layout) => {
      this.keyboard = layout;
      console.log("keyboard: ", this.keyboard);
    });
  }

}
