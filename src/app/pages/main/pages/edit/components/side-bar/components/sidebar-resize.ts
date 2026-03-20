import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

// Models
import { ResizeOptions } from '@models/image';

// Spartan
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmButtonImports } from '@spartan-ng/helm/button';

// NgIcon
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLink, lucideUnlink } from '@ng-icons/lucide';

@Component({
  selector: 'sidebar-resize',
  imports: [HlmCheckboxImports, HlmButtonImports, NgIcon],
  providers: [provideIcons({ lucideLink, lucideUnlink })],
  template: `
    <section>
      <div class="flex items-center justify-between mb-2">
        <p class="text-xs font-medium text-muted-foreground">Resize</p>
        <hlm-checkbox [checked]="!!resize()" (checkedChange)="toggle($event)" />
      </div>
      @if (resize()) {
        <div class="flex items-center gap-2">
          <div class="grid grid-cols-2 gap-2 flex-1">
            <div>
              <label class="text-xs text-muted-foreground">Width</label>
              <input
                type="number"
                hlmInput
                [value]="resize()!.width"
                (change)="patchWidth(+$any($event.target).value)"
                class="w-full mt-1"
              />
            </div>
            <div>
              <label class="text-xs text-muted-foreground">Height</label>
              <input
                type="number"
                hlmInput
                [value]="resize()!.height"
                (change)="patchHeight(+$any($event.target).value)"
                class="w-full mt-1"
              />
            </div>
          </div>
          <button
            hlmBtn
            variant="ghost"
            size="icon"
            class="mt-4 shrink-0"
            (click)="toggleAspect()"
            [title]="resize()!.keep_aspect ? 'Unlock aspect ratio' : 'Lock aspect ratio'"
          >
            <ng-icon
              [name]="resize()!.keep_aspect ? 'lucideLink' : 'lucideUnlink'"
              class="size-4"
            />
          </button>
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
export class SidebarResize {
  resize = input<ResizeOptions | undefined>(undefined);
  resizeChange = output<ResizeOptions | undefined>();

  private get aspectRatio(): number {
    const r = this.resize();
    if (!r || !r.height) return 1;
    return r.width / r.height;
  }

  toggle(enabled: boolean) {
    this.resizeChange.emit(enabled ? { width: 800, height: 600, keep_aspect: true } : undefined);
  }

  toggleAspect() {
    const r = this.resize();
    if (!r) return;
    const keep_aspect = !r.keep_aspect;
    // When enabling, recompute width based on current height
    const width = keep_aspect ? Math.round(r.height * this.aspectRatio) : r.width;
    this.resizeChange.emit({ ...r, width, keep_aspect });
  }

  patchWidth(width: number) {
    const r = this.resize()!;
    const height = r.keep_aspect ? Math.round(width / this.aspectRatio) : r.height;
    this.resizeChange.emit({ ...r, width, height });
  }

  patchHeight(height: number) {
    const r = this.resize()!;
    const width = r.keep_aspect ? Math.round(height * this.aspectRatio) : r.width;
    this.resizeChange.emit({ ...r, width, height });
  }
}
