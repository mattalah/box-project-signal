import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { BoxStore } from './state/state';
import { BoxComponent } from './components/Box/Box.component';
import { SubBoxComponent } from './components/SubBox/SubBox.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, BoxComponent, SubBoxComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  readonly state = inject(BoxStore);


  result: number = 0;

  reset() {
    this.state.resetState();
  }
}
