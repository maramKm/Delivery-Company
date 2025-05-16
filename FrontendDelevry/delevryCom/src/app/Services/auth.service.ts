import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly USER_DATA_KEY = 'userData';

  constructor() {}

  saveUserData(data: any): void {
    localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(data));
  }

  getUserData(): any {
    const userData = localStorage.getItem(this.USER_DATA_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  clearUserData(): void {
    localStorage.removeItem(this.USER_DATA_KEY);
  }

  isLoggedIn(): boolean {
    return this.getUserData() !== null;
  }
  getCurrentUserId(): number | null {
    const userData = this.getUserData();
    return userData?.id || null;
  }
}
