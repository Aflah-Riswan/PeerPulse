import { OtpRecord } from "../../types/otp.types.js";

export interface IOtpRepository {
  saveOtp(email: string, otpHash: string, ttlSeconds: number): Promise<void>;
  getOtp(email: string): Promise<OtpRecord | null>;
  increamentAttempt(email: string): Promise<number>;
  setCoolDown(email: string, ttlSeconds: number): Promise<void>;
  deleteOtp(email: string): Promise<void>;
  isInCoolDown(email: string): Promise<boolean>;
  markEmailVerified(email: string, ttlSeconds: number): Promise<void>;
  isEmailVerified(email: string): Promise<boolean>;
  clearEmailVerified(email: string): Promise<void>;
}
