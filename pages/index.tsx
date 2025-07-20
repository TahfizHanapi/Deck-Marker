import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Deck as DeckType } from "../types";
import Deck from "../components/Deck";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Card order: 2-10, Jack, Queen, King, Ace; suits: Diamond, Club, Love, Spade
const ranks = [
  '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'
];
const suits = ['Diamond', 'Club', 'Love', 'Spade'];

const cardImages = [] as { id: string; image: string }[];
for (const rank of ranks) {
  for (const suit of suits) {
    const id = `${rank}-${suit}`;
    const image = `/images/${rank} ${suit}.png`;
    cardImages.push({ id, image });
  }
}

const initialDecks: DeckType[] = [
  {
    id: 'main',
    name: 'Full Deck',
    description: 'All playing cards',
    cards: cardImages.map((c) => ({ id: c.id, name: c.id, isUsed: false })),
  },
];

export default function Home() {
  const [decks, setDecks] = useState<DeckType[]>(initialDecks);

  const handleCardMark = (deckId: string, cardId: string, isUsed: boolean) => {
    setDecks((prevDecks) =>
      prevDecks.map((deck) => {
        if (deck.id === deckId) {
          return {
            ...deck,
            cards: deck.cards.map((card) =>
              card.id === cardId ? { ...card, isUsed } : card
            ),
          };
        }
        return deck;
      })
    );
  };

  const handleReset = () => {
    setDecks((prevDecks) =>
      prevDecks.map((deck) => ({
        ...deck,
        cards: deck.cards.map((card) => ({ ...card, isUsed: false })),
      }))
    );
  };

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto p-8 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent animate-pulse">
            Deck Mark
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
        </div>
        
        <div className="flex justify-end mb-8">
          <button
            onClick={handleReset}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 hover:from-purple-500 hover:to-pink-500 border border-purple-400/20 backdrop-blur-sm"
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset All Cards
            </span>
          </button>
        </div>
        
        <div className="space-y-8">
          {decks.map((deck) => (
            <Deck
              key={deck.id}
              deck={deck}
              onCardMark={handleCardMark}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
