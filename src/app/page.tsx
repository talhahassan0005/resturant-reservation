"use client";

import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { useRouter } from "next/navigation";
import type { BookingDraft } from "@/store/slices/reservationsSlice";
import { setDraft } from "@/store/slices/reservationsSlice";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SearchBar from "@/components/SearchBar";
import FeatureCards from "@/components/FeatureCards";
import RestaurantList from "@/components/RestaurantList";
import Footer from "@/components/Footer";

import { RESTAURANTS } from "@/data/restaurants";
import { normalize } from "@/utils/helpers";
import type { Restaurant } from "@/components/RestaurantCard";

function HomePageInner() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [location, setLocation] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [partySize, setPartySize] = useState<number>(2);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [searched, setSearched] = useState(false);

  const filtered = useMemo(() => {
    if (!searched) return RESTAURANTS;
    const loc = normalize(location);
    const cui = normalize(cuisine);
    return RESTAURANTS.filter((r) => {
      const matchLoc = loc.length === 0 || normalize(r.location).includes(loc);
      const matchCui = cui.length === 0 || normalize(r.cuisine).includes(cui);
      return matchLoc && matchCui;
    });
  }, [location, cuisine, searched]);

  const onSearch = () => {
    setSearched(true);
    const draft: BookingDraft = {
      location: location || undefined,
      cuisine: cuisine || undefined,
      partySize,
      date: date || undefined,
      time: time || undefined,
    };
    dispatch(setDraft(draft));
  };

  const onPickRestaurant = (r: Restaurant) => {
    const draft: BookingDraft = {
      location: location || r.location,
      cuisine: cuisine || r.cuisine,
      partySize,
      date: date || undefined,
      time: time || undefined,
      restaurantId: r.id,
    };
    dispatch(setDraft(draft));
    router.push(`/restaurant/${r.id}`);
  };

  const onClearFilters = () => {
    setLocation("");
    setCuisine("");
    setSearched(false);
  };

  return (
    <>
      <Navbar />

      <HeroSection>
        <SearchBar
          location={location} setLocation={setLocation}
          cuisine={cuisine} setCuisine={setCuisine}
          date={date} setDate={setDate}
          time={time} setTime={setTime}
          partySize={partySize} setPartySize={setPartySize}
          onSearch={onSearch}
        />
      </HeroSection>

      <div style={{ background: "var(--rrs-bg)", minHeight: "60vh" }}>
        <div className="rrs-main">
          <FeatureCards />
          <RestaurantList
            restaurants={filtered}
            searched={searched}
            location={location}
            onPickRestaurant={onPickRestaurant}
            onClearFilters={onClearFilters}
          />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default function HomePage() {
  return (
    <Provider store={store}>
      <HomePageInner />
    </Provider>
  );
}
