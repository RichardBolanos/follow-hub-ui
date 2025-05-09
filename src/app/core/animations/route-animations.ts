import { trigger, transition, style, animate } from '@angular/animations';

export const routeAnimations = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ opacity: 0, transform: 'translateY(10px) scale(0.98)' }),
    animate('200ms ease-out', style({ opacity: 1, transform: 'none' })),
  ])
]);