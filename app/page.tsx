import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Chair from "./components/Chair";
import Services from "./components/Services";
import Looks from "./components/Looks";
import Visit from "./components/Visit";
import Footer from "./components/Footer";
import SeatBooking from "./components/SeatBooking";

export default function Page() {
  return (<><Nav /><main><Hero /><Chair /><Services /><Looks /><Visit /></main><Footer /><SeatBooking /></>);
}
