import { useMemo } from 'react';
import { Deck as DeckType } from '../types';

interface DeckProps {
  deck: DeckType;
  onCardMark: (deckId: string, cardId: string, isUsed: boolean) => void;
}

const ranks = [
  '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'
];
const suits = ['Diamond', 'Club', 'Love', 'Spade'];

export default function Deck({ deck, onCardMark }: DeckProps) {
  // Map card id to image path
  const cardImages = useMemo(() => {
    const map: Record<string, string> = {};
    for (const rank of ranks) {
      for (const suit of suits) {
        const id = `${rank}-${suit}`;
        map[id] = `/images/${rank} ${suit}.png`;
      }
    }
    return map;
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-800 via-purple-900 to-slate-900 rounded-2xl shadow-2xl p-8 mb-8 border border-purple-500/20 backdrop-blur-sm">
      <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        {deck.name}
      </h2>
      {deck.description && (
        <p className="text-purple-200 mb-6 text-lg">{deck.description}</p>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
        {deck.cards.map((card) => (
          <div
            key={card.id}
            className={`relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 group ${
              card.isUsed 
                ? 'border-red-500/50 shadow-lg shadow-red-500/20' 
                : 'border-purple-400/50 shadow-lg shadow-purple-500/20 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-400/30'
            }`}
            onClick={() => {
              if (!card.isUsed) onCardMark(deck.id, card.id, true);
            }}
            style={{ pointerEvents: card.isUsed ? 'none' : 'auto' }}
          >
            <img
              src={cardImages[card.id]}
              alt={card.id}
              className={`w-full h-auto block transition-all duration-300 ${
                card.isUsed 
                  ? 'filter brightness-50 contrast-75 opacity-80' 
                  : 'filter brightness-100 contrast-100 opacity-100 group-hover:brightness-110'
              }`}
              draggable={false}
            />
            {card.isUsed && (
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/60 via-red-800/40 to-red-900/60 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-red-200 text-sm font-bold mb-1">Used</div>
                  <div className="w-8 h-8 mx-auto bg-red-500/80 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
            {!card.isUsed && (
              <div className="absolute inset-0 bg-gradient-to-t from-purple-500/0 via-transparent to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 