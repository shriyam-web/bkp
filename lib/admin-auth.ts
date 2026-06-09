import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export function isAdminAuthenticated(): boolean {
  return cookies().get('admin_session')?.value === 'true';
}

export function unauthorizedResponse() {
  return NextResponse.json(
    { success: false, error: 'Unauthorized' },
    { status: 401 }
  );
}
