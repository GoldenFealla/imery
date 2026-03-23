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
      <div class="flex items-center gap-3">
        <hlm-slider min="-180" max="180" [value]="angle()" (valueChange)="angle.set($event)" />
        <span class="text-sm text-muted-foreground w-10 text-right"> {{ angle() }}° </span>
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

  reset() {
    this.angle.set([0]);
  }
}
