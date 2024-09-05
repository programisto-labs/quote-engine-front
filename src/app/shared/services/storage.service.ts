import {inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";


@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly platform = inject(PLATFORM_ID);

  get localStorage() {
    return isPlatformBrowser(this.platform) ? window.localStorage : null;
  }

  get(key: string) {
    return JSON.parse(this.localStorage?.getItem(key) || '{}') || {};
  }

  set(key: string, value: any): boolean {
    this.localStorage?.setItem(key, JSON.stringify(value));

    return true;
  }

  has(key: string): boolean {
    return !!this.localStorage?.getItem(key);
  }

  remove(key: string) {
    this.localStorage?.removeItem(key);
  }

  clear() {
    this.localStorage?.clear();
  }
}

export class MemoryStorageService {
  private store: { [k: string]: string } = {};

  get(key: string) {
    return JSON.parse(this.store[key] || '{}') || {};
  }

  set(key: string, value: any): boolean {
    this.store[key] = JSON.stringify(value);
    return true;
  }

  has(key: string): boolean {
    return !!this.store[key];
  }

  remove(key: string) {
    delete this.store[key];
  }

  clear() {
    this.store = {};
  }
}
