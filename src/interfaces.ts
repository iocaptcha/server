export interface ScoreRequest {
  // The client-generated UUID (token)
  token: string
  // Whether to invalidate the token after this request
  // This means that future calls with the same token (pass_uuid), will return an error.
  // Default: true - invalidate the token after this request
  // You should always invalidate the token after you're done checking it,
  // to prevent replay attacks.
  invalidate: boolean
  // (optional) Provide the user's IP address for additional verification
  user_ip?: string
  // (optional) Provide the user's useragent for additional verification
  user_useragent?: string
}

export interface ScoreResponse {
  // Whether the token passed verification, as determined by the endpoint's score threshold
  pass: boolean
  // Whether an error occurred
  // If it did, all fields below are defaulted to null, and pass to false.
  error?: string
  // The score of the token (0.0-1.0)
  score?: number
  // (ENTERPRISE ONLY)
  // Additional flags that were triggered by the token.
  // https://iocaptcha.com/docs#flags
  flags?: string[]
  // If user_ip was provided within the ScoreRequest,
  // it will be verified against the client's IP address used to generate the token.
  // This determines whether the IP address matches the one used to generate the token.
  ip_match?: boolean
  // If user_useragent was provided within the ScoreRequest,
  // it will be verified against the client's useragent used to generate the token.
  // This determines whether the useragent matches the one used to generate the token.
  ua_match?: boolean
}
