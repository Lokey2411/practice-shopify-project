import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "@config/env";

const SECRET_KEY: Secret = JWT_SECRET as Secret;

const EXPIRES_IN: string | number = isNaN(Number(JWT_EXPIRES_IN))
    ? JWT_EXPIRES_IN
    : Number(JWT_EXPIRES_IN);

export const generateToken = (userId: string): string => {
    return jwt.sign({ userId }, SECRET_KEY, {
        expiresIn: EXPIRES_IN,
    } as SignOptions);
};
