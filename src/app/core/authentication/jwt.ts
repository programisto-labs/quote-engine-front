import {Token, User} from "./interface";
import {base64, currentTimestamp, filterObject} from "./helpers";

export class JWT {
  generate(user: User): Token {
    const expiresIn = 3600;
    const refreshTokenExpiresIn = 86400;

    return filterObject({
      access_token: this.createToken(user, expiresIn),
      token_type: 'bearer',
      expires_in: user['refresh_token'] ? expiresIn : undefined,
      refresh_token: user['refresh_token'] ? this.createToken(user, refreshTokenExpiresIn) : undefined,
    }) as Token;
  }

  createToken(user: User, expiresIn = 0) {
    const exp = user['refresh_token'] ? currentTimestamp() + expiresIn : undefined;

    return [
      base64.encode(JSON.stringify({ typ: 'JWT', alg: 'HS256' })),
      base64.encode(JSON.stringify(filterObject(Object.assign({ exp, user })))),
      base64.encode('ng-matero'),
    ].join('.');
  }

  private static parseToken(accessToken: string) {
    const [, payload] = accessToken.split('.');

    return JSON.parse(base64.decode(payload));
  }

  private static isExpired(data: any, now: Date) {
    const expiresIn = new Date();
    expiresIn.setTime(data.exp * 1000);
    const diff = this.dateToSeconds(expiresIn) - this.dateToSeconds(now);

    return diff <= 0;
  }

  private static dateToSeconds(date: Date) {
    return Math.ceil(date.getTime() / 1000);
  }
}
