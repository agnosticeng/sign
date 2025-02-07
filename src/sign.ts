class Signer {
  private key: Promise<CryptoKey>;

  constructor(secret: string) {
    const encoder = new TextEncoder();
    this.key = crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: { name: "SHA-256" } },
      false,
      ["sign"],
    );
  }

  private async hmac(input: string): Promise<string> {
    const key = await this.key;
    const encoder = new TextEncoder();
    const data = encoder.encode(input);

    const signature = await crypto.subtle.sign("HMAC", key, data);
    const bytes = new Uint8Array(signature);
    let hex = "";
    for (let i = 0; i < bytes.length; i++) {
      hex += bytes[i].toString(16).padStart(2, "0");
    }
    return hex;
  }

  sign(id: string, exp: string) {
    return this.hmac(`${id}${exp}`);
  }

  async check(id: string, exp: string, expected: string) {
    return (await this.hmac(id + exp)) === expected;
  }
}

export { Signer };
