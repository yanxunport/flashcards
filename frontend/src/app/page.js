import CreateDeck from "@/components/CreateDeck";
import DeckList from "@/components/DeckList";
import AIGenerator from "@/components/AIGenerator";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <main className="max-w-7xl mx-auto p-8 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT SIDE */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            <section className="card-container p-6">
              <h1 className="text-2xl font-extrabold text-green-600 drop-shadow-sm tracking-tight">
                FlashLearn
              </h1>

              <CreateDeck />
            </section>

            <section className="card-container p-6">
              <AIGenerator />
            </section>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-2">
            <section className="card-container p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-extrabold text-green-600 drop-shadow-sm tracking-tight">
                  Current Decks
                </h2>
              </div>

              <DeckList />
            </section>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}