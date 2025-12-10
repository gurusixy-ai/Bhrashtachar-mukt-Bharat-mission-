export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export enum UserStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface OrganizationAssets {
  logo?: string;
  stamp?: string;
  signature?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
}

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string; // Base64
  caption?: string;
  timestamp: string;
  approved: boolean;
}

export interface User {
  id: string;
  edNumber: string; // Unique ID like BMBM-2025-XXXX
  email: string; // Used for login correlation (Gmail/FB), but hidden in UI
  authProvider: 'google' | 'facebook' | 'manual';
  password?: string; 
  role: UserRole;
  status: UserStatus;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
  gallery: MediaItem[];
  details: {
    fullName: string;
    fatherName: string;
    dob: string;
    mobile: string;
    
    // Detailed Address
    village: string; // Gaon / Mohalla
    post: string;
    block: string;   // Block / Tehsil
    district: string;
    state: string;
    
    department: string;
    designation: string;
    photoUrl: string; // Base64
    aadhaarFrontUrl?: string; // Base64
    aadhaarBackUrl?: string; // Base64
    joiningDate: string;
  };
  documents: {
    joiningLetterContent?: string;
    generatedAt?: string;
  };
}

export interface LoginResponse {
  user: User;
  token: string;
}