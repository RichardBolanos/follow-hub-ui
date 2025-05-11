import { ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync }           from 'ngrx-store-localstorage';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  // Solo sincronizar en el navegador
  if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
    return reducer;
  }
  return localStorageSync({
    keys: ['auth'],
    rehydrate: true
  })(reducer);
}

export const metaReducers: MetaReducer<any>[] = [ localStorageSyncReducer ];
