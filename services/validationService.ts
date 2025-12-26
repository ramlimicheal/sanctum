export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const validators = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 255;
  },

  password: (password: string): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];
    if (password.length < 8) errors.push('Password must be at least 8 characters');
    if (!/[A-Z]/.test(password)) errors.push('Password must contain at least one uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('Password must contain at least one lowercase letter');
    if (!/[0-9]/.test(password)) errors.push('Password must contain at least one number');
    return { valid: errors.length === 0, errors };
  },

  username: (username: string): boolean => {
    const usernameRegex = /^[a-zA-Z0-9_-]{3,30}$/;
    return usernameRegex.test(username);
  },

  url: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  reference: (reference: string): boolean => {
    const referenceRegex = /^[1-3]?\s*[A-Za-z\s]+\s+\d+:\d+$/;
    return referenceRegex.test(reference);
  },

  prayerRequest: (text: string): boolean => {
    if (!text || text.trim().length === 0) return false;
    if (text.length > 5000) return false;
    return true;
  },

  sanitizeHtml: (html: string): string => {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
  },

  sanitizeText: (text: string): string => {
    return text
      .trim()
      .slice(0, 10000)
      .replace(/[<>]/g, '');
  },

  validatePrayer: (prayer: {
    title?: string;
    content: string;
    category?: string;
  }): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!prayer.content || prayer.content.trim().length === 0) {
      errors.push('Prayer content is required');
    }
    if (prayer.content && prayer.content.length > 5000) {
      errors.push('Prayer content must not exceed 5000 characters');
    }
    if (prayer.title && prayer.title.length > 200) {
      errors.push('Prayer title must not exceed 200 characters');
    }

    return { valid: errors.length === 0, errors };
  },

  validateJournal: (entry: {
    title: string;
    content: string;
  }): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!entry.title || entry.title.trim().length === 0) {
      errors.push('Journal title is required');
    }
    if (entry.title && entry.title.length > 200) {
      errors.push('Journal title must not exceed 200 characters');
    }
    if (!entry.content || entry.content.trim().length === 0) {
      errors.push('Journal content is required');
    }
    if (entry.content && entry.content.length > 10000) {
      errors.push('Journal content must not exceed 10000 characters');
    }

    return { valid: errors.length === 0, errors };
  },

  validateIntercession: (item: {
    name: string;
    request: string;
  }): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!item.name || item.name.trim().length === 0) {
      errors.push('Name is required');
    }
    if (item.name && item.name.length > 200) {
      errors.push('Name must not exceed 200 characters');
    }
    if (!item.request || item.request.trim().length === 0) {
      errors.push('Prayer request is required');
    }
    if (item.request && item.request.length > 2000) {
      errors.push('Prayer request must not exceed 2000 characters');
    }

    return { valid: errors.length === 0, errors };
  },
};

export default validators;
