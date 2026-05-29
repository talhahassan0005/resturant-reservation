import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type BookingDraft = {
  restaurantId?: string;
  location?: string;
  cuisine?: string;
  date?: string;
  time?: string;
  partySize?: number;
  name?: string;
  phone?: string;
  email?: string;
  specialRequest?: string;
};

export type BookingStatus = "confirmed" | "cancelled" | "modified" | "no-show";

export type SavedBooking = {
  id: string;
  ref: string;
  restaurantId: string;
  restaurantName: string;
  location: string;
  cuisine: string;
  date: string;
  time: string;
  partySize: number;
  name: string;
  phone: string;
  email: string;
  specialRequest?: string;
  status: BookingStatus;
  depositPaid: number;
  createdAt: string;
};

type ReservationsState = {
  draft: BookingDraft;
  bookingConfirmed: boolean;
  bookings: SavedBooking[];
};

const MOCK_BOOKINGS: SavedBooking[] = [
  {
    id: "b1", ref: "TN1234567",
    restaurantId: "r2", restaurantName: "Spice Route",
    location: "Karachi", cuisine: "Pakistani",
    date: "2026-06-15", time: "19:30", partySize: 4,
    name: "Ahmed Khan", phone: "0312-3456789", email: "ahmed@example.com",
    specialRequest: "Window seat please",
    status: "confirmed", depositPaid: 500,
    createdAt: "2026-05-20",
  },
  {
    id: "b2", ref: "TN7654321",
    restaurantId: "r5", restaurantName: "Casa Milano",
    location: "Karachi", cuisine: "Italian",
    date: "2026-05-10", time: "20:00", partySize: 2,
    name: "Ahmed Khan", phone: "0312-3456789", email: "ahmed@example.com",
    status: "confirmed", depositPaid: 500,
    createdAt: "2026-05-01",
  },
  {
    id: "b3", ref: "TN9988776",
    restaurantId: "r1", restaurantName: "Brisket & Bowls",
    location: "Lahore", cuisine: "American",
    date: "2026-04-22", time: "13:00", partySize: 3,
    name: "Ahmed Khan", phone: "0312-3456789", email: "ahmed@example.com",
    status: "cancelled", depositPaid: 500,
    createdAt: "2026-04-10",
  },
];

const initialState: ReservationsState = {
  draft: {},
  bookingConfirmed: false,
  bookings: MOCK_BOOKINGS,
};

const reservationsSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    setDraft(state, action: PayloadAction<BookingDraft>) {
      state.draft = action.payload;
      state.bookingConfirmed = false;
    },
    updateDraft(state, action: PayloadAction<Partial<BookingDraft>>) {
      state.draft = { ...state.draft, ...action.payload };
      state.bookingConfirmed = false;
    },
    confirmBooking(state) {
      state.bookingConfirmed = true;
      // Save to bookings history
      if (state.draft.restaurantId) {
        const NAMES: Record<string, string> = {
          r1: "Brisket & Bowls", r2: "Spice Route", r3: "Sushi Station",
          r4: "Lahori Darbar", r5: "Casa Milano", r6: "The Rooftop Grill",
        };
        const newBooking: SavedBooking = {
          id: "b" + Date.now(),
          ref: "TN" + Math.floor(1000000 + Math.random() * 9000000),
          restaurantId: state.draft.restaurantId,
          restaurantName: NAMES[state.draft.restaurantId] ?? state.draft.restaurantId,
          location: state.draft.location ?? "",
          cuisine: state.draft.cuisine ?? "",
          date: state.draft.date ?? "",
          time: state.draft.time ?? "",
          partySize: state.draft.partySize ?? 2,
          name: state.draft.name ?? "",
          phone: state.draft.phone ?? "",
          email: state.draft.email ?? "",
          specialRequest: state.draft.specialRequest,
          status: "confirmed",
          depositPaid: 500,
          createdAt: new Date().toISOString().split("T")[0],
        };
        state.bookings.unshift(newBooking);
      }
    },
    cancelBooking(state, action: PayloadAction<string>) {
      const b = state.bookings.find(b => b.id === action.payload);
      if (b) b.status = "cancelled";
    },
    modifyBooking(state, action: PayloadAction<{ id: string; date: string; time: string; partySize: number }>) {
      const b = state.bookings.find(b => b.id === action.payload.id);
      if (b) {
        b.date = action.payload.date;
        b.time = action.payload.time;
        b.partySize = action.payload.partySize;
        b.status = "modified";
      }
    },
    resetBooking(state) {
      state.draft = {};
      state.bookingConfirmed = false;
    },
  },
});

export const { setDraft, updateDraft, confirmBooking, resetBooking, cancelBooking, modifyBooking } =
  reservationsSlice.actions;

export const reservationsReducer = reservationsSlice.reducer;
