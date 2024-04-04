import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LayoutComponent {}
