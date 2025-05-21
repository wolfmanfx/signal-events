import { inject, Signal } from "@angular/core";
import { signalStoreFeature, withHooks, withMethods } from "@ngrx/signals";
import { EventInstance, Events } from "@ngrx/signals/events";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { tap } from "rxjs";

export type StoreType<T> = {
	[K in keyof T]: Signal<T[K]>;
}

export function withMetaReducer<T>(metaReducer: (ev: EventInstance<string, unknown>, store: T) => void) {
  return signalStoreFeature(
    withMethods((store) => ({
      metaReducer: rxMethod<EventInstance<string, unknown>>((c$) =>
        c$.pipe(
          tap((ev) => {
            metaReducer(ev, store as T);
          })
        )
      ),
    })),
    withHooks({
      onInit: ({ metaReducer }) => {
        metaReducer(inject(Events).on());
      },
    })
  );
}
