export const validEmail = new RegExp(
  "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
);
export const validPassword = new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$");

export const validName = new RegExp("^[a-zA-Zà-üÀ-Ü'-\\s]+$");

export const validNumber = new RegExp("^[0-9\\s+]+$");

export const validRoadName = new RegExp("^.{5,}$");

export const validPostalCode = new RegExp("^[a-zA-Z0-9\\s\\-\\./]+$");
