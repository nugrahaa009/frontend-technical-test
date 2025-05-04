import jwt_encode from "jwt-encode"
import { jwtDecode } from "jwt-decode";

const secret = 'your-secret-key'; // Bebas, asal konsisten

export const generateToken = (email: string, provider: string) => {
  const payload = {
    email,
    provider,
    name: 'Aditya Nugraha',
  };

  return jwt_encode(payload, secret);
};

export const decodeToken = (token: string): {
  email: string;
  provider: string;
  name: string;
} => {
  return jwtDecode(token);
};