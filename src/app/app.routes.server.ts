import { RenderMode, ServerRoute } from '@angular/ssr';
import { CategoryService } from './services/category.service';
import { inject } from '@angular/core';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'products/:category',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const categoryServ = inject(CategoryService);
      const names = categoryServ.getCategories();
      return names.map((name) => ({ category: String(name) }));
    }
  },
  {
    path: 'wishlist',
    renderMode: RenderMode.Client
  },
  {
    path: 'cart',
    renderMode: RenderMode.Client
  },
  {
    path: 'checkout',
    renderMode: RenderMode.Client
  },
  {
    path: 'order-success',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];
