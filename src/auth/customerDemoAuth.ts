export const demoCustomer = {
  name: 'Thando Mkhize',
  mobile: '0825550147',
  pin: '123456',
};

export function isRegisteredDemoCustomer(mobile: string) {
  return mobile.replace(/\D/g, '') === demoCustomer.mobile;
}

export function verifyDemoCustomerPin(pin: string) {
  return pin === demoCustomer.pin;
}
