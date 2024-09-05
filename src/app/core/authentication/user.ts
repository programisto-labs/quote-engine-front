import { User } from './interface';

export const admin: User = {
  id: 1,
  username: 'admin',
  password: 'admin',
  name: 'Admin',
  email: 'admin329@163.com',
  avatar: 'images/avatar.jpg',
  roles: ['admin'],
  permissions: []
};

export const guest: User = {
  id: 2,
  username: 'guest',
  password: 'guest',
  name: 'Guest',
  email: 'guest@pro.fr',
  avatar: 'images/avatar-default.svg',
  roles: ['guest'],
  permissions: []
};

export const anonymous: User = {
  id: 3,
  username: 'anonymous',
  password: 'anonymous',
  name: 'Anonymous',
  email: 'anonymous@pro.fr',
  avatar: 'images/avatar-default.svg',
  roles: ['anonymous'],
  permissions: []
};
