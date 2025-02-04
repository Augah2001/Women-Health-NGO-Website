// utils/jwtUtils.js

import jwt_decode from "jsonwebtoken";


export const parseJwt =<T>(token: string) => {
  if (!token) return null;

  try {
    const decodedToken = jwt_decode.decode(token);
    return decodedToken as T;
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
};
