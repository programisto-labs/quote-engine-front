export interface ClientContact {
  fullname: string;
  company: string;
  email: string;
  tele: string;
  coreBusiness?: string;
  concept?: string;
}

export const defaultClientContact: ClientContact = {
  fullname: '',
  company: '',
  email: '',
  tele: '',
  coreBusiness: '',
  concept: ''
}
