import { SendOtpEmailPayload } from "../../types/otp.types.js";
import { INotificationPublisher } from "./interface/notification.publisher.interface.js";

export class ConsoleNotificationPublisher implements INotificationPublisher {
    async sendOtpEmail(payload: SendOtpEmailPayload): Promise<void> {
       console.log( `[DEV OTP] To: ${payload.email} | Code: ${payload.otp} | Expires in: ${payload.expiresInMinutes} min`)
    }
}