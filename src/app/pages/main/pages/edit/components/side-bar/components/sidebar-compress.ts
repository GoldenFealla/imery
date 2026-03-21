import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

// Models
import { CompressOptions } from '@models/image';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmSliderImports } from '@spartan-ng/helm/slider';

@Component({
  selector: 'sidebar-compress',
  imports: [HlmSliderImports, HlmCheckboxImports],
  template: `
    <section>
      <div class="flex items-center justify-between mb-2">
        <p class="text-xs font-medium text-muted-foreground">Compress</p>
        <hlm-checkbox [checked]="!!compress()" (checkedChange)="toggle($event)" />
      </div>
      @if (compress()) {
        <div class="flex items-center gap-3">
          <hlm-slider
            min="1"
            max="100"
            step="1"
            [value]="[compress()!.quality]"
            (valueChange)="compressChange.emit({ quality: $event[0] })"
          />
          <span class="text-sm text-muted-foreground w-10 text-right">
            {{ compress()!.quality }}%
          </span>
        </div>
      }
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarCompress {
  compress = input<CompressOptions | undefined>(undefined);

  compressChange = output<CompressOptions | undefined>();

  toggle(enabled: boolean) {
    this.compressChange.emit(enabled ? { quality: 80 } : undefined);
  }
}
