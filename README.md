# @agnosticeng/sign

A simple TypeScript library for URL signing and verification.

## Installation

```bash
npm install @agnosticeng/sign
```

## Usage

```typescript
import { sign, check } from '@agnosticeng/sign';

// Generate a signed URL
const url = new URL('https://example.com/path');
url.searchParams.set('exp', '1234567890'); // Optional expiration
const secret = 'your-secret-key';

const signedUrl = await sign(secret, url);
console.log(signedUrl.toString());
// https://example.com/path?exp=1234567890&sig=...

// Verify a signed URL
const isValid = await check(secret, signedUrl);
console.log(isValid); // true
```

## API

### sign(secret: string, url: URL): Promise<URL>

Signs a URL by adding a signature query parameter.

- `secret`: A secret key used for signing
- `url`: URL object to sign
- Returns: Promise resolving to signed URL

### check(secret: string, url: URL): Promise<boolean>

Verifies if a URL signature is valid.

- `secret`: Same secret key used for signing
- `url`: Signed URL object to verify
- Returns: Promise resolving to boolean indicating if signature is valid

## How it works

The library generates an HMAC SHA-256 signature based on:
- URL hostname
- URL pathname
- Expiration value (if present in query params)

The signature is added as a `sig` query parameter.

## License

MIT
