import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

// Models
import { Format } from '@models/image';

// Spartan
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'sidebar-format',
  imports: [HlmButtonImports],
  template: `
    <section>
      <p class="text-xs font-medium text-muted-foreground mb-2">Format</p>
      <div class="flex gap-2">
        @for (fmt of allFormats; track fmt) {
          <button
            hlmBtn
            [variant]="format() === fmt ? 'default' : 'outline'"
            size="sm"
            (click)="formatChange.emit(fmt)"
          >
            {{ fmt }}
          </button>
        }
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
export class SidebarFormat {
  allFormats: Format[] = ['jpeg', 'png', 'webp'];
  format = input<Format | undefined>(undefined);
  formatChange = output<Format>();
}
