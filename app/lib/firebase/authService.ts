// Firebase authentication service
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  User,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './config';

// Helper function to set auth cookie
function setAuthCookie(token: string) {
  if (typeof document !== 'undefined') {
    document.cookie = `admin-auth-token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; secure; samesite=strict`;
  }
}

// Helper function to remove auth cookie
function removeAuthCookie() {
  if (typeof document !== 'undefined') {
    document.cookie = 'admin-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}

// Admin user interface
export interface AdminUser {
  uid: string;
  email: string;
  role: 'admin' | 'super_admin';
  permissions: AdminPermission[];
  createdAt: string;
  lastLogin: string;
  isActive: boolean;
}

// Admin permissions
export type AdminPermission = 
  | 'seo_management'
  | 'user_management'
  | 'content_management'
  | 'analytics_access'
  | 'system_settings';

// Default admin emails (configure these as environment variables in production)
const ADMIN_EMAILS = [
  process.env.NEXT_PUBLIC_ADMIN_EMAIL
];

// Check if user is admin
export function isAdminEmail(email: string): boolean {
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

// Sign in admin user
export async function signInAdmin(email: string, password: string): Promise<AdminUser> {
  try {
    if (!isAdminEmail(email)) {
      throw new Error('Access denied. Admin privileges required.');
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Get the ID token for middleware validation
    const idToken = await user.getIdToken();
    setAuthCookie(idToken);

    // Get or create admin profile
    let adminUser = await getAdminProfile(user.uid);
    
    if (!adminUser) {
      // Create new admin profile
      adminUser = await createAdminProfile(user);
    } else {
      // Update last login
      await updateAdminLastLogin(user.uid);
    }

    return adminUser;
  } catch (error: any) {
    throw new Error(error.message || 'Authentication failed');
  }
}

// Create admin profile
async function createAdminProfile(user: User): Promise<AdminUser> {
  const adminUser: AdminUser = {
    uid: user.uid,
    email: user.email!,
    role: 'admin',
    permissions: ['seo_management', 'content_management', 'analytics_access'],
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    isActive: true
  };

  await setDoc(doc(db, 'admin_users', user.uid), adminUser);
  return adminUser;
}

// Get admin profile
export async function getAdminProfile(uid: string): Promise<AdminUser | null> {
  try {
    const docRef = doc(db, 'admin_users', uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as AdminUser;
    }
    return null;
  } catch (error) {
    console.error('Error getting admin profile:', error);
    return null;
  }
}

// Update last login
async function updateAdminLastLogin(uid: string): Promise<void> {
  try {
    const docRef = doc(db, 'admin_users', uid);
    await setDoc(docRef, { lastLogin: new Date().toISOString() }, { merge: true });
  } catch (error) {
    console.error('Error updating last login:', error);
  }
}

// Sign out admin
export async function signOutAdmin(): Promise<void> {
  try {
    removeAuthCookie();
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}

// Listen to auth state changes
export function onAdminAuthStateChanged(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, set/refresh the auth cookie
      try {
        const idToken = await user.getIdToken();
        setAuthCookie(idToken);
      } catch (error) {
        console.error('Error setting auth cookie:', error);
      }
    } else {
      // User is signed out, remove the auth cookie
      removeAuthCookie();
    }
    callback(user);
  });
}

// Create admin user (for super admin only)
export async function createAdminUser(
  email: string, 
  password: string, 
  role: 'admin' | 'super_admin' = 'admin',
  permissions: AdminPermission[] = ['seo_management', 'content_management']
): Promise<AdminUser> {
  try {
    if (!isAdminEmail(email)) {
      throw new Error('Email not authorized for admin access');
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: 'Admin User'
    });

    const adminUser: AdminUser = {
      uid: user.uid,
      email: user.email!,
      role,
      permissions,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      isActive: true
    };

    await setDoc(doc(db, 'admin_users', user.uid), adminUser);
    return adminUser;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to create admin user');
  }
}

// Reset admin password
export async function resetAdminPassword(email: string): Promise<void> {
  try {
    if (!isAdminEmail(email)) {
      throw new Error('Email not authorized for admin access');
    }
    
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    throw new Error(error.message || 'Failed to send password reset email');
  }
}

// Check if user has specific permission
export function hasPermission(adminUser: AdminUser | null, permission: AdminPermission): boolean {
  if (!adminUser || !adminUser.isActive) return false;
  if (adminUser.role === 'super_admin') return true;
  return adminUser.permissions.includes(permission);
}
