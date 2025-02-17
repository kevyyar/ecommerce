import { v4 as uuidv4 } from "uuid";

const GUEST_ID_KEY = "guestCartId";

export interface GuestCart {
  guestId: string;
  createdAt: Date;
}

export function generateGuestId(): string {
  return uuidv4();
}

export function getStoredGuestId(): string | null {
  return localStorage.getItem(GUEST_ID_KEY);
}

export function storeGuestId(id: string): void {
  localStorage.setItem(GUEST_ID_KEY, id);
}

export function initializeGuestCart(): GuestCart {
  const existingId = getStoredGuestId();
  if (existingId) {
    return {
      guestId: existingId,
      createdAt: new Date(), // Note: We can't get original creation date from localStorage
    };
  }

  const newId = generateGuestId();
  storeGuestId(newId);
  return {
    guestId: newId,
    createdAt: new Date(),
  };
}
