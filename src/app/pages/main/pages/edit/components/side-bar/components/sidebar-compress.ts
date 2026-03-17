import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

// Models
import { CompressOptions } from '@models/image';

@Component({
  selector: 'sidebar-compress',
  imports: [],
  template: `
    <section>
      <div class="flex items-center justify-between mb-2">
        <p class="text-xs font-medium text-muted-foreground">Compress</p>
        <input
          type="checkbox"
          [checked]="!!compress()"
          (change)="toggle($any($event.target).checked)"
        />
      </div>
      @if (compress()) {
        <div class="flex items-center gap-3">
          <input
            type="range"
            min="1"
            max="100"
            step="1"
            [value]="compress()!.quality"
            (input)="compressChange.emit({ quality: +$any($event.target).value })"
            class="flex-1"
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
