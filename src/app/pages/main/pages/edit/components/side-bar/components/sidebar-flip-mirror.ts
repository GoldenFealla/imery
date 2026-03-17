import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

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
        <button
          hlmBtn
          [variant]="flip() ? 'default' : 'outline'"
          size="sm"
          (click)="change.emit({ flip: !flip() })"
        >
          <ng-icon name="lucideFlipVertical" size="14" class="mr-1" /> Flip
        </button>
        <button
          hlmBtn
          [variant]="mirror() ? 'default' : 'outline'"
          size="sm"
          (click)="change.emit({ mirror: !mirror() })"
        >
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
  flip = input<boolean>(false);
  mirror = input<boolean>(false);

  change = output<Partial<TransformOptions>>();
}
