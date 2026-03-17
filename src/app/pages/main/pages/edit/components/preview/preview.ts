import { ChangeDetectionStrategy, Component, input } from '@angular/core';

// Icons
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLoader } from '@ng-icons/lucide';

@Component({
  selector: 'edit-preview',
  imports: [NgIcon],
  templateUrl: './preview.html',
  providers: [provideIcons({ lucideLoader })],
  styleUrl: './preview.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Preview {
  url = input<string | null>(null);
  isPreviewing = input<boolean>(false);
}
