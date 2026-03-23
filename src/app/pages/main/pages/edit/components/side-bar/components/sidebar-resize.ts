import { ChangeDetectionStrategy, Component, effect, model, output, signal } from '@angular/core';

// Models
import { ResizeOptions } from '@models/image';

// Spartan
import { HlmButtonImports } from '@spartan-ng/helm/button';

// NgIcon
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLink, lucideUnlink } from '@ng-icons/lucide';

// Component
import { SidebarToggle } from './sidebar-toggle';

// Default value
const DefaultResizeWidth = 800;
const DefaultResizeHeight = 600;
const DefaultResizeKeepAspect = true;

@Component({
  standalone: true,
  selector: 'sidebar-resize',
  imports: [NgIcon, HlmButtonImports, SidebarToggle],
  providers: [provideIcons({ lucideLink, lucideUnlink })],
  template: `
    <sidebar-toggle category="Resize">
      <div class="flex items-center gap-2">
        <div class="grid grid-cols-2 gap-2 flex-1">
          <div>
            <label class="text-xs text-muted-foreground">Width</label>
            <input type="number" hlmInput class="w-full mt-1" [value]="width()" (change)="handleOnInputWidth($event)" />
          </div>
          <div>
            <label class="text-xs text-muted-foreground">Height</label>
            <input type="number" hlmInput class="w-full mt-1" [value]="height()" (change)="handleOnInputHeight($event)" />
          </div>
        </div>
        <button hlmBtn variant="ghost" size="icon" class="mt-4 shrink-0" (click)="handleOnToggleAspect()">
          <ng-icon [name]="keep_aspect() ? 'lucideLink' : 'lucideUnlink'" class="size-4" />
        </button>
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
export class SidebarResize {
  width = signal<number>(DefaultResizeWidth);
  height = signal<number>(DefaultResizeHeight);
  keep_aspect = signal<boolean>(DefaultResizeKeepAspect);

  resize = output<ResizeOptions>();

  constructor() {
    effect(() => {
      this.resize.emit({ height: this.height(), width: this.width(), keep_aspect: this.keep_aspect() });
    });
  }

  private get aspectRatio(): number {
    return this.width() / this.height();
  }

  handleOnInputWidth(event: Event) {
    const value = (event.target as HTMLInputElement).valueAsNumber;
    const h = this.keep_aspect() ? Math.round(value / this.aspectRatio) : this.height();
    this.width.set(value);
    this.height.set(h);
  }

  handleOnInputHeight(event: Event) {
    const value = (event.target as HTMLInputElement).valueAsNumber;
    const w = this.keep_aspect() ? Math.round(value * this.aspectRatio) : this.width();
    this.height.set(value);
    this.width.set(w);
  }

  handleOnToggleAspect() {
    const w = this.keep_aspect() ? Math.round(this.height() * this.aspectRatio) : this.width();
    this.width.set(w);
    this.keep_aspect.set(!this.keep_aspect());
  }
}
