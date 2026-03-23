import { ChangeDetectionStrategy, Component, computed, output, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { skip } from 'rxjs';

// Icons
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFlipHorizontal, lucideFlipVertical } from '@ng-icons/lucide';
import { ToggleValue } from '@spartan-ng/brain/toggle-group';

// Spartan
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmToggleGroupImports } from '@spartan-ng/helm/toggle-group';

// Component
import { SidebarToggle } from './sidebar-toggle';

type State = 'flip' | 'mirror';

@Component({
  selector: 'sidebar-flip-mirror',
  imports: [NgIcon, HlmToggleGroupImports, HlmButtonImports, SidebarToggle],
  providers: [provideIcons({ lucideFlipVertical, lucideFlipHorizontal })],
  template: `
    <sidebar-toggle category="Flip / Mirror" [visible]="true" (isActive)="isActive.set($event)">
      <div class="flex gap-2">
        <hlm-toggle-group
          type="multiple"
          variant="outline"
          spacing="2"
          size="sm"
          [nullable]="true"
          [value]="default"
          (valueChange)="handleOnValueChange($event)"
        >
          <button hlmToggleGroupItem class="data-[state=on]:bg-primary data-[state=on]:text-background" size="sm" value="flip">
            <ng-icon name="lucideFlipVertical" size="14" class="mr-1" /> Flip
          </button>
          <button hlmToggleGroupItem class="data-[state=on]:bg-primary data-[state=on]:text-background" size="sm" value="mirror">
            <ng-icon name="lucideFlipHorizontal" size="14" class="mr-1" /> Mirror
          </button>
        </hlm-toggle-group>
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
export class SidebarFlipMirror {
  default: State[] = [];

  flip = output<boolean | undefined>();
  mirror = output<boolean | undefined>();

  states = signal<State[]>([]);
  isActive = signal<boolean>(false);

  private flipWatcher = computed(() => (this.isActive() ? this.states().includes('flip') : undefined));

  private mirrorWatcher = computed(() => (this.isActive() ? this.states().includes('mirror') : undefined));

  constructor() {
    toObservable(this.flipWatcher)
      .pipe(skip(1))
      .subscribe((v) => this.flip.emit(v));
    toObservable(this.mirrorWatcher)
      .pipe(skip(1))
      .subscribe((v) => this.mirror.emit(v));
  }

  handleOnValueChange(state: ToggleValue<State>) {
    this.states.set(state as State[]);
  }
}
