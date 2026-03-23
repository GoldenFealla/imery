import { ChangeDetectionStrategy, Component, effect, input, model, output, signal } from '@angular/core';

// Models
import { TransformOptions } from '@models/image';

// Icons
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFlipHorizontal, lucideFlipVertical } from '@ng-icons/lucide';

// Spartan
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'sidebar-flip-mirror',
  imports: [NgIcon, HlmButtonImports],
  providers: [provideIcons({ lucideFlipVertical, lucideFlipHorizontal })],
  template: `
    <section>
      <p class="text-xs font-medium text-muted-foreground mb-2">Flip / Mirror</p>
      <div class="flex gap-2">
        <button hlmBtn [variant]="flipState() ? 'default' : 'outline'" size="sm" (click)="handleOnFlip()">
          <ng-icon name="lucideFlipVertical" size="14" class="mr-1" /> Flip
        </button>
        <button hlmBtn [variant]="mirrorState() ? 'default' : 'outline'" size="sm" (click)="handleOnMirror()">
          <ng-icon name="lucideFlipHorizontal" size="14" class="mr-1" /> Mirror
        </button>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarFlipMirror {
  flipState = signal<boolean>(false);
  mirrorState = signal<boolean>(false);

  flip = output<boolean>();
  mirror = output<boolean>();

  constructor() {
    effect(() => {
      this.flip.emit(this.flipState());
    });

    effect(() => {
      this.mirror.emit(this.mirrorState());
    });
  }

  handleOnFlip() {
    this.flipState.set(!this.flipState());
  }

  handleOnMirror() {
    this.mirrorState.set(!this.mirrorState());
  }
}
