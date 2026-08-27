/**
 * Form Validation Utilities
 */

export interface ValidationError {
  [key: string]: string;
}

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
export const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

export const validators = {
  email: (value: string): string | null => {
    if (!value) return 'Email is required';
    if (!emailRegex.test(value)) return 'Invalid email address';
    return null;
  },

  password: (value: string): string | null => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(value)) return 'Password must contain uppercase letter';
    if (!/[a-z]/.test(value)) return 'Password must contain lowercase letter';
    if (!/[0-9]/.test(value)) return 'Password must contain number';
    return null;
  },

  phone: (value: string): string | null => {
    if (!value) return 'Phone number is required';
    if (!phoneRegex.test(value)) return 'Invalid phone number';
    return null;
  },

  required: (value: string, fieldName: string = 'This field'): string | null => {
    if (!value || value.trim() === '') return `${fieldName} is required`;
    return null;
  },

  minLength: (value: string, min: number, fieldName: string = 'This field'): string | null => {
    if (!value) return null;
    if (value.length < min) return `${fieldName} must be at least ${min} characters`;
    return null;
  },

  maxLength: (value: string, max: number, fieldName: string = 'This field'): string | null => {
    if (!value) return null;
    if (value.length > max) return `${fieldName} must not exceed ${max} characters`;
    return null;
  },

  url: (value: string): string | null => {
    if (!value) return null;
    if (!urlRegex.test(value)) return 'Invalid URL';
    return null;
  },

  number: (value: string | number): string | null => {
    if (value === '' || value === null) return null;
    if (isNaN(Number(value))) return 'Must be a valid number';
    return null;
  },

  date: (value: string): string | null => {
    if (!value) return null;
    const date = new Date(value);
    if (isNaN(date.getTime())) return 'Invalid date';
    return null;
  },
};

export interface FormValidationConfig {
  [fieldName: string]: ((value: any) => string | null)[];
}

export const validateForm = (
  data: Record<string, any>,
  config: FormValidationConfig
): ValidationError => {
  const errors: ValidationError = {};

  Object.keys(config).forEach((fieldName) => {
    const rules = config[fieldName];
    const value = data[fieldName];

    for (const rule of rules) {
      const error = rule(value);
      if (error) {
        errors[fieldName] = error;
        break;
      }
    }
  });

  return errors;
};

export const hasErrors = (errors: ValidationError): boolean => {
  return Object.keys(errors).length > 0;
};
