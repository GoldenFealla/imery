import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';

// Models
import { Image } from '@models/image';

// Icons
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePencil, lucideTrash2 } from '@ng-icons/lucide';

// Spartan
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmSkeletonImports } from '@spartan-ng/helm/skeleton';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';

@Component({
  selector: 'galleries-image-card',
  imports: [NgIcon, HlmButtonImports, HlmSkeletonImports, HlmBadgeImports],
  providers: [provideIcons({ lucidePencil, lucideTrash2 })],
  templateUrl: './image-card.html',
  styleUrl: './image-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCard {
  image = input.required<Image>();
  loaded = signal<boolean>(false);

  edit = output<string>();
  delete = output<string>();
}
