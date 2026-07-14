export interface Driver {
  id: string;
  name: string;
  license: string;
}

export interface DriverCreate {
  name: string;
  license: string;
}