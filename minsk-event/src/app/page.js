import "./globals.css";
import EventMap from "../components/events/EventMap";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">События в Минске</h2>
      <EventMap />
    </main>
  );
}
