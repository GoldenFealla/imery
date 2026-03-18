import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

// Icons
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideRefreshCcw } from '@ng-icons/lucide';

// Spartan
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmSliderImports } from '@spartan-ng/helm/slider';
@Component({
  selector: 'sidebar-rotate',
  imports: [NgIcon, HlmButtonImports, HlmSliderImports],
  providers: [provideIcons({ lucideRefreshCcw })],
  template: `
    <section>
      <p class="text-xs font-medium text-muted-foreground mb-2">Rotate</p>
      <div class="flex items-center gap-3">
        <hlm-slider
          min="-180"
          max="180"
          [value]="[angle()]"
          (valueChange)="angleChange.emit($event[0])"
        />
        <span class="text-sm text-muted-foreground w-10 text-right"> {{ angle() }}° </span>
        <button hlmBtn size="icon" variant="ghost" (click)="reset()">
          <ng-icon name="lucideRefreshCcw"></ng-icon>
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
export class SidebarRotate {
  angle = input<number>(0);

  angleChange = output<number>();

  reset() {
    this.angleChange.emit(0);
  }
}
