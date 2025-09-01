import { Request } from 'express';
import ApiError from './ApiError';

/**
 * Get pagination parameters from request query
 */
export const getPagination = (req: Request) => {
  const page = Math.max(1, parseInt(req.query.page as string) || 1);
  const limit = Math.max(1, Math.min(100, parseInt(req.query.limit as string) || 10));
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

/**
 * Get sorting parameters from request query
 */
export const getSorting = (req: Request, defaultSort: string = '-createdAt') => {
  const sortBy = (req.query.sort as string) || defaultSort;
  return sortBy;
};

/**
 * Get search filter from request query
 */
export const getSearchFilter = (req: Request, searchFields: string[] = []) => {
  const search = req.query.search as string;
  if (!search || searchFields.length === 0) return {};

  const searchRegex = new RegExp(search, 'i');
  const searchFilter = {
    $or: searchFields.map(field => ({
      [field]: { $regex: searchRegex }
    }))
  };

  return searchFilter;
};

/**
 * Generate random string
 */
export const generateRandomString = (length: number = 8): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

/**
 * Generate random number
 */
export const generateRandomNumber = (length: number = 6): string => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10);
  }
  return result;
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number format
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone);
};

/**
 * Remove undefined fields from object
 */
export const removeUndefined = (obj: any): any => {
  Object.keys(obj).forEach(key => {
    if (obj[key] === undefined || obj[key] === null) {
      delete obj[key];
    }
  });
  return obj;
};

/**
 * Convert object to query string
 */
export const objectToQueryString = (obj: any): string => {
  return Object.keys(obj)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&');
};

/**
 * Parse query string to object
 */
export const queryStringToObject = (queryString: string): any => {
  return Object.fromEntries(new URLSearchParams(queryString));
};

/**
 * Delay execution
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Deep clone object
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Capitalize first letter of each word
 */
export const capitalizeWords = (str: string): string => {
  return str.replace(/\b\w/g, char => char.toUpperCase());
};

/**
 * Truncate string with ellipsis
 */
export const truncateString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
};