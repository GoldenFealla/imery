import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';

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
    <sidebar-toggle category="Compress">
      <div class="flex items-center gap-3">
        <hlm-slider min="1" max="100" step="1" [value]="[q()]" (valueChange)="compress.emit({ quality: $event[0] })" />
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

  compress = output<CompressOptions>();
}
