import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

// Models
import { WatermarkOptions } from '@models/image';

@Component({
  selector: 'sidebar-watermark',
  imports: [],
  template: `
    <section>
      <div class="flex items-center justify-between mb-2">
        <p class="text-xs font-medium text-muted-foreground">Watermark</p>
        <input
          type="checkbox"
          [checked]="!!watermark()"
          (change)="toggle($any($event.target).checked)"
        />
      </div>
      @if (watermark()) {
        <div class="space-y-2">
          <input
            type="text"
            hlmInput
            placeholder="Watermark text"
            [value]="watermark()!.text"
            (input)="patch('text', $any($event.target).value)"
            class="w-full"
          />
          <div class="flex items-center gap-3">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              [value]="watermark()!.opacity"
              (input)="patch('opacity', +$any($event.target).value)"
              class="flex-1"
            />
            <span class="text-sm text-muted-foreground w-10 text-right">
              {{ (watermark()!.opacity * 100).toFixed(0) }}%
            </span>
          </div>
          <select
            hlmInput
            class="w-full"
            [value]="watermark()!.position"
            (change)="patch('position', $any($event.target).value)"
          >
            @for (pos of positions; track pos) {
              <option [value]="pos">{{ pos }}</option>
            }
          </select>
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
export class SidebarWatermark {
  positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'center'];

  watermark = input<WatermarkOptions | undefined>(undefined);
  watermarkChange = output<WatermarkOptions | undefined>();

  toggle(enabled: boolean) {
    this.watermarkChange.emit(
      enabled ? { text: '', opacity: 0.5, position: 'bottom-right' } : undefined,
    );
  }

  patch(field: keyof WatermarkOptions, value: string | number) {
    this.watermarkChange.emit({ ...this.watermark()!, [field]: value });
  }
}
