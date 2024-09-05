import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {find, from, map, of} from 'rxjs';

import {admin, anonymous, guest} from './user';
import { Token } from './interface';
import {JWT} from "./jwt";
import MenuData from '../bootstrap/menu.json';
import {Menu} from "../bootstrap/menu.service";

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  protected readonly http = inject(HttpClient);
  private readonly jwt = new JWT();
  private users = [admin, guest, anonymous];

  login(username: string, password: string, rememberMe = false) {

    return from(this.users).pipe(
      find(user => user && (user['username'] === username || user['email'] === username)),
      map(user => {
        if (!user) {
          throw new Error("User doesn't exist.");
        }

        if (user['password'] !== password) {
          throw new Error('Invalid user or password');
        }

        const currentUser = Object.assign({}, user);
        delete currentUser['password'];

        return this.jwt.generate(currentUser);
      }));

    // return this.http.post<Token>('/auth/login', { username, password, rememberMe });
  }

  refresh(params: Record<string, any>) {
    return this.http.post<Token>('/auth/refresh', params);
  }

  logout() {
    return this.http.post<any>('/auth/logout', {});
  }

  me() {
    let result = anonymous;
    delete result['password'];
    return of(result);

    // return this.http.get<User>('/me');
  }

  menu() {
    return of( MenuData.menu as Menu[] );

    // return this.http.get<{ menu: Menu[] }>('/me/menu').pipe(map(res => res.menu));
  }
}
