export interface ClientContact {
  fullname: string;
  company: string;
  email: string;
  tele: string;
}

export const defaultClientContact: ClientContact = {
  fullname: '',
  company: '',
  email: '',
  tele: ''
}
