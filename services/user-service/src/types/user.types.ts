export enum UserRole {
  USER = "user",
  ADMIN = "admin"
}
export enum AuthProvider {
  GOOGLE = "google",
  LOCAL = "local"
}
export enum ThemePreferences {
  DARK = "dark",
  LIGHT = "light",
  SYSTEM = "system"
}
export enum CredentialStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected"
}
export interface IUserCredential {
  fileName: string;
  fileurl: string;
  fileType: string;
  fileSize: number;
  status: CredentialStatus;
  uploadedAt: Date;
  reviewedAt: Date | null;
  rejectedAt: Date | null;
  rejectionReason: string | null;
}
export interface IUserModeration {
  strikesCount: number;
  suspendedUntil?: Date | null;
  adminNote?: string | null;
}
export interface IUserPreferences {
  theme: ThemePreferences;
}
export interface IUser {
  email: string;
  passwordHashed: string;
  authProvider: AuthProvider;
  providerId: string;
  roles: string;
  emailVerified: boolean;

  fullName: string;
  avatarUrl?: string;
  tagline?: string;
  bio?: string;
  highlightedSkils: string[];
  preferredLanguage: string;
  isVerifiedMentor: boolean;

  reputationScore: number;
  averageRating: number;
  totalReviewsCount: number;
  sessionsCompleted: number;
  attendanceRate: number;
  averageAiScore: number;

  isProUnlocked: boolean;
  freeSessionCount: number;
  freeSessionTarget: number;

  credentials: IUserCredential[];
  moderation: IUserModeration;
  preferences: IUserPreferences;

  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
    fullName : string
    email : string
    passwordHash : string
}
