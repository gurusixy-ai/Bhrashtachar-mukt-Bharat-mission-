import { User, UserRole, UserStatus, OrganizationAssets } from '../types';

const STORAGE_KEY = 'bmbm_users_v3'; // Version bumped to v3 for schema change
const CURRENT_USER_KEY = 'bmbm_current_user';
const ASSETS_KEY = 'bmbm_org_assets';

// Initialize with a default admin if empty
const initStorage = () => {
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (!existing) {
      const adminUser: User = {
        id: 'admin-1',
        edNumber: 'BMBM-ADMIN-001',
        email: 'bmbm.gov@gmail.com',
        password: 'Guru563@#', 
        authProvider: 'manual',
        role: UserRole.ADMIN,
        status: UserStatus.APPROVED,
        gallery: [],
        details: {
          fullName: 'System Administrator',
          fatherName: 'N/A',
          dob: '1990-01-01',
          mobile: '9410020563',
          village: 'Naushera',
          post: 'Medical College',
          block: 'Sadar',
          district: 'Budaun',
          state: 'Uttar Pradesh',
          department: 'IT Cell',
          designation: 'Super Admin',
          photoUrl: 'https://picsum.photos/200',
          joiningDate: new Date().toISOString().split('T')[0]
        },
        documents: {}
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify([adminUser]));
    }
  } catch (error) {
    console.error("Init storage failed:", error);
  }
};

export const getUsers = (): User[] => {
  initStorage();
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Get users failed:", error);
    return [];
  }
};

export const saveUser = (user: User): void => {
  try {
    const users = getUsers();
    const index = users.findIndex(u => u.id === user.id);
    if (index >= 0) {
      users[index] = user;
    } else {
      users.push(user);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    
    // Update session if it's the current user
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.id === user.id) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    }
  } catch (error: any) {
    console.error("Storage error:", error);
    if (error.name === 'QuotaExceededError' || error.message?.includes('exceeded the quota')) {
      alert("Storage limit reached! Please delete some data or try a different browser.");
    }
  }
};

export const getCurrentUser = (): User | null => {
  try {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    return null;
  }
};

export const setCurrentUser = (user: User | null): void => {
  try {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  } catch (error: any) {
    console.error("Set current user error:", error);
    if (error.name === 'QuotaExceededError') {
       alert("Storage full. Could not maintain session.");
    }
  }
};

export const generateEdNumber = (): string => {
  const year = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `BMBM-${year}-${random}`;
};

export const getOrgAssets = (): OrganizationAssets => {
  try {
    const data = localStorage.getItem(ASSETS_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    return {};
  }
};

export const saveOrgAssets = (assets: OrganizationAssets): void => {
  try {
    localStorage.setItem(ASSETS_KEY, JSON.stringify(assets));
  } catch (error: any) {
    console.error("Asset save error:", error);
    if (error.name === 'QuotaExceededError') {
      alert("Storage full. Cannot save organization assets. Try smaller images.");
    }
  }
};