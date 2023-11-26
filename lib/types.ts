export type User = {
  name: string;
  email: string;
  address: string;
  state: string;
  password: string;
  location: string;
  phoneNumber: string;
  communityId: string;
};

export type State = {
  statename: string;
};
export type Community = {
  communityname: string;
  id: string;
};

export type LoggedUserType = {
  addres: string;
  communityId: string;
  customername: string;
  email: string;
  phone: string;
  productInCart: string;
  statename: string;
};
