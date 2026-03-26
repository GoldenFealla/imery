import { ChangeDetectionStrategy, Component, signal, output, effect, computed } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { skip } from 'rxjs';

// Models
import { RotateOptions } from '@models/image';

// Icons
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideRefreshCcw } from '@ng-icons/lucide';

// Spartan
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmSliderImports } from '@spartan-ng/helm/slider';

// Component
import { SidebarToggle } from './sidebar-toggle';

@Component({
  selector: 'sidebar-rotate',
  imports: [NgIcon, HlmButtonImports, HlmSliderImports, SidebarToggle],
  providers: [provideIcons({ lucideRefreshCcw })],
  template: `
    <sidebar-toggle category="Rotate" [visible]="true" (isActive)="isActive.set($event)">
      <div class="flex items-center gap-1">
        <hlm-slider min="-180" max="180" [value]="angle()" (valueChange)="angle.set($event)" />
        <div class="inline-flex items-center gap-0.5">
          <input
            hlmInput
            type="number"
            min="-180"
            max="180"
            class="w-7 text-sm text-muted-foreground text-right angle-input invalid:text-red-500"
            [value]="angle()[0]"
            (change)="handleOnChangeAngle($event)"
          />
          <span class="text-sm text-muted-foreground">°</span>
        </div>
        <button hlmBtn size="icon" variant="ghost" (click)="reset()">
          <ng-icon name="lucideRefreshCcw"></ng-icon>
        </button>
      </div>
    </sidebar-toggle>
  `,
  styles: `
    :host {
      display: block;
    }

    .angle-input::-webkit-outer-spin-button,
    .angle-input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarRotate {
  angle = signal<number[]>([0]);
  rotate = output<RotateOptions | undefined>();

  isActive = signal<boolean>(false);

  private watcher = computed<RotateOptions | undefined>(() => {
    if (!this.isActive()) return undefined;
    return { angle: this.angle()[0] };
  });

  constructor() {
    toObservable(this.watcher)
      .pipe(skip(1))
      .subscribe((v) => this.rotate.emit(v));
  }

  handleOnChangeAngle(event: Event) {
    const value = (event.target as HTMLInputElement).valueAsNumber;
    this.angle.set([value]);
  }

  reset() {
    this.angle.set([0]);
  }
}
