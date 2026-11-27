import mongoose, { Document, Schema } from "mongoose";
import {
  AuthProvider,
  CredentialStatus,
  IUser,
  IUserCredential,
  IUserModeration,
  IUserPreferences,
  ThemePreferences,
  UserRole
} from "../types/user.types.js";

export interface IUserDocument extends IUser, Document {}

const credentialSchema = new Schema<IUserCredential>(
  {
    fileName: { type: String, required: true, trim: true },
    fileurl: { type: String, required: true, trim: true },
    fileType: { type: String, required: true, trim: true },
    fileSize: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: Object.values(CredentialStatus),
      default: CredentialStatus.PENDING
    },
    uploadedAt: { type: Date, default: Date.now },
    reviewedAt: { type: Date, default: null },
    rejectedAt: { type: Date, default: null },
    rejectionReason: { type: String, default: null, trim: true }
  },
  {
    _id: true
  }
);

const moderationSchema = new Schema<IUserModeration>(
  {
    strikesCount: { type: Number, default: 0 },
    suspendedUntil: { type: Date, default: null },
    adminNote: { type: String, default: null, trim: true }
  },
  { _id: false }
);
const preferenceSchema = new Schema<IUserPreferences>(
  {
    theme: {
      type: String,
      enum: Object.values(ThemePreferences),
      default: ThemePreferences.SYSTEM
    }
  },
  { _id: false }
);

const userSchema = new Schema<IUserDocument>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      index: true
    },
    passwordHashed: {
      type: String,
      required: true,
      select: false
    },
    authProvider: {
      type: String,
      enum: Object.values(AuthProvider),
      default: AuthProvider.LOCAL
    },
    providerId: {
      type: String,
      sparse: true
    },
    roles: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER
    },
    emailVerified: {
      type: Boolean,
      default: false
    },

    fullName: {
      type: String,
      required: true,
      trim: true
    },
    avatarUrl: { type: String, default: "" },
    tagline: { type: String, default: "" },
    bio: { type: String, default: "" },
    highlightedSkils: { type: [String], default: [] },
    preferredLanguage: { type: String, default: "en" },

    isVerifiedMentor: { type: Boolean, default: false },
    reputationScore: { type: Number, default: 0, min: 0 },
    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    totalReviewsCount: { type: Number, default: 0, min: 0 },
    sessionsCompleted: { type: Number, default: 0, min: 0 },
    attendanceRate: { type: Number, default: 100, min: 0, max: 100 },
    averageAiScore: { type: Number, default: 0, min: 0, max: 100 },

    isProUnlocked: { type: Boolean, default: false },
    freeSessionCount: { type: Number, default: 0, min: 0 },
    freeSessionTarget: { type: Number, default: 3, min: 0 },

    credentials: { type: [credentialSchema], defuat: [] },
    moderation: { type: moderationSchema, default: () => ({}) },
    preferences: { type: preferenceSchema, default: () => ({}) }
  },

  { timestamps: true }
);

export const UserModel = mongoose.model<IUserDocument>("User", userSchema);
