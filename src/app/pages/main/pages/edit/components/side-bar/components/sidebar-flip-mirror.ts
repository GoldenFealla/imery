import { ChangeDetectionStrategy, Component, effect, input, model, output, signal } from '@angular/core';

// Icons
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFlipHorizontal, lucideFlipVertical } from '@ng-icons/lucide';
import { ToggleValue } from '@spartan-ng/brain/toggle-group';

// Spartan
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmToggleGroupImports } from '@spartan-ng/helm/toggle-group';

type State = 'flip' | 'mirror';

@Component({
  selector: 'sidebar-flip-mirror',
  imports: [NgIcon, HlmToggleGroupImports, HlmButtonImports],
  providers: [provideIcons({ lucideFlipVertical, lucideFlipHorizontal })],
  template: `
    <section>
      <p class="text-xs font-medium text-muted-foreground mb-2">Flip / Mirror</p>
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
  default: State[] = [];

  flip = output<boolean>();
  mirror = output<boolean>();

  handleOnValueChange(state: ToggleValue<State>) {
    const states = state as State[];
    this.flip.emit(states.includes('flip'));
    this.mirror.emit(states.includes('mirror'));
  }
}
