import { JWTPayload, SignJWT, importJWK, jwtVerify } from "jose"

export const generateJWT = async (payload: JWTPayload) => {
  const secret = process.env.AUTH_SECRET || "secret"
  const jwk = await importJWK({ k: secret, alg: "HS256", kty: "oct" })
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("365d")
    .sign(jwk)
  return jwt
}

export const verifyJWT = async (token: string): Promise<JWTPayload | null> => {
  try {
    const secret = process.env.AUTH_SECRET || "secret"
    const jwk = await importJWK({ k: secret, alg: "HS256", kty: "oct" })
    const { payload } = await jwtVerify(token, jwk)
    return payload
  } catch (error) {
    console.error("Invalid JWT:", error)
    return null
  }
}
