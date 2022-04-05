import {FetchBaseQueryError} from '@reduxjs/toolkit/query';

export function isFetchBaseQueryError(
    error: unknown,
): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

export function isErrorWithMessage(
    error: any,
): error is { data: { message: string, status: number } } {
  if (error) {
    if (
        error.data &&
        error.data.message &&
        typeof error.data.message === 'string' &&
        error.data.status &&
        typeof error.data.status === 'number'
    ) {
      return true;
    }
  }
  return false;
}
