import crypto from "crypto";

export function verify(ts, rawBody) {
  const body = ts + rawBody;
  const secretKey = process.env.CASHFREE_SECRET_KEY;
  let genSignature = crypto
    .createHmac("sha256", secretKey)
    .update(body)
    .digest("base64");
  return genSignature;
}
