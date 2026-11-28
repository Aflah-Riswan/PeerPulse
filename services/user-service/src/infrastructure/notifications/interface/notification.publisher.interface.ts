import { SendOtpEmailPayload } from "../../../types/otp.types.js";

export interface INotificationPublisher {
    sendOtpEmail(payload : SendOtpEmailPayload) :Promise<void>
}