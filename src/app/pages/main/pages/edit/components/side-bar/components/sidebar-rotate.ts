import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'sidebar-rotate',
  imports: [],
  template: `
    <section>
      <p class="text-xs font-medium text-muted-foreground mb-2">Rotate</p>
      <div class="flex items-center gap-3">
        <input
          type="range"
          min="-180"
          max="180"
          step="1"
          [value]="angle()"
          (input)="angleChange.emit(+$any($event.target).value)"
          class="flex-1"
        />
        <span class="text-sm text-muted-foreground w-10 text-right"> {{ angle() }}° </span>
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
}
