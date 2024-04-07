import jwt from "jsonwebtoken";

export default function parseToken(token: string | undefined) {
  try {
    if (token) {
      const decodedToken: any = jwt.verify(token, process.env.TOEKN_SECRET!);
      return decodedToken.id;
    }
    return "";
  } catch (e: any) {
    console.log(e.message);
  }
}
