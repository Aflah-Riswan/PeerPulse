export interface OtpRecord {
  otpHash: string;
  attempts: number;
}

export interface SendOtpEmailPayload {
  email : string,
  otp : number,
  expiresInMinutes : number
}