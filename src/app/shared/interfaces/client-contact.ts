export interface ClientContact {
  fullname: string;
  enterprise: string;
  email: string;
  tele: string;
}

export const defaultClientContact: ClientContact = {
  fullname: '',
  enterprise: '',
  email: '',
  tele: ''
}
