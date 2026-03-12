import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Navbar } from '@components/navbar/navbar';
import { ImageService } from '@services/image';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, Navbar],
  templateUrl: './main.html',
  styleUrl: './main.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Main {
  private imageService = inject(ImageService);

  ngOnInit() {
    this.imageService.GetGalleries().subscribe();
  }
}
