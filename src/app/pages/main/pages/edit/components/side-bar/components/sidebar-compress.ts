import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';

// Models
import { CompressOptions } from '@models/image';

// Spartan
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmSliderImports } from '@spartan-ng/helm/slider';

// Components
import { SidebarToggle } from './sidebar-toggle';

@Component({
  selector: 'sidebar-compress',
  imports: [HlmSliderImports, HlmCheckboxImports, SidebarToggle],
  template: `
    <sidebar-toggle category="Compress" (isActive)="isActive.set($event)">
      <div class="flex items-center gap-3">
        <hlm-slider min="1" max="100" step="1" [value]="[q()]" (valueChange)="q.set($event[0])" />
        <span class="text-sm text-muted-foreground w-10 text-right"> {{ q() }}% </span>
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
export class SidebarCompress {
  q = signal<number>(80);

  compress = output<CompressOptions | undefined>();

  isActive = signal<boolean>(false);

  constructor() {
    effect(() => {
      if (!this.isActive()) {
        this.compress.emit(undefined);
        return;
      }
      this.compress.emit({ quality: this.q() });
    });
  }
}
