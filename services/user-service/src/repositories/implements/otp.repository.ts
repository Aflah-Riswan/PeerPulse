import { Redis } from "ioredis";
import { IOtpRepository } from "../interface/otp.repository.js";
import { OtpRecord } from "../../types/otp.types.js";

export class OtpRespository implements IOtpRepository {
  constructor(private readonly redis: Redis) {}
  private otpkey(email: string): string {
    return `otp:verify:${email}`;
  }
  private coolDownKey(email: string): string {
    return `otp:cooldown:${email}`;
  }
  private verifiedKey(email: string): string {
    return `email:verified:${email}`;
  }
  async saveOtp(email: string, otpHash: string, ttlSeconds: number): Promise<void> {
    const key = this.otpkey(email);
    await this.redis.multi().hset(key, { otpHash, attempts: 0 }).expire(key, ttlSeconds).exec();
  }

  async getOtp(email: string): Promise<OtpRecord | null> {
    const data = await this.redis.hgetall(this.otpkey(email));
    if (!data.otp) {
      return null;
    }
    return {
      otpHash: data.otpHash,
      attempts: Number(data.attempts) || 0
    };
  }
  async increamentAttempt(email: string): Promise<number> {
    return await this.redis.hincrby(this.otpkey(email), "attempts", 1);
  }
  async setCoolDown(email: string, ttlSeconds: number): Promise<void> {
    await this.redis.set(this.coolDownKey(email), 1, "EX", ttlSeconds);
  }
  async deleteOtp(email: string): Promise<void> {
    await this.redis.del(this.otpkey(email));
  }
  async isEmailVerified(email: string): Promise<boolean> {
    const exists = await this.redis.exists(this.verifiedKey(email));
    return exists === 1;
  }
  async markEmailVerified(email: string, ttlSeconds: number): Promise<void> {
    await this.redis.set(this.verifiedKey(email), "true", "EX", ttlSeconds);
  }
  async clearEmailVerified(email: string): Promise<void> {
    await this.redis.del(this.verifiedKey(email));
  }
  async isInCoolDown(email: string): Promise<boolean> {
    const exists = await this.redis.exists(this.coolDownKey(email));
    return exists === 1;
  }
}
