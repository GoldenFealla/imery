import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';

// Models
import { CompressOptions } from '@models/image';
import { provideIcons } from '@ng-icons/core';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmSliderImports } from '@spartan-ng/helm/slider';

@Component({
  selector: 'sidebar-compress-quality',
  imports: [HlmSliderImports, HlmCheckboxImports],
  template: `
    <div class="flex items-center gap-3">
      <hlm-slider min="1" max="100" step="1" [value]="[q()]" (valueChange)="quality.emit($event[0])" />
      <span class="text-sm text-muted-foreground w-10 text-right"> {{ q() }}% </span>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarCompressQuality {
  q = signal<number>(80);
  quality = output<number>();
}

@Component({
  selector: 'sidebar-compress',
  imports: [SidebarCompressQuality, HlmCheckboxImports],
  template: `
    <section>
      <div class="flex items-center justify-between mb-2">
        <p class="text-xs font-medium text-muted-foreground">Compress</p>
        <hlm-checkbox [checked]="shown()" (checkedChange)="toggleVisible($event)" />
      </div>
      @if (shown()) {
        <sidebar-compress-quality (quality)="compress.emit({ quality: $event })" />
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
  shown = signal<boolean>(false);
  compress = output<CompressOptions>();

  toggleVisible(enabled: boolean) {
    this.shown.set(enabled);
  }
}
