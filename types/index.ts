export interface Card {
  id: string;
  name: string;
  description?: string;
  isUsed: boolean;
}

export interface Deck {
  id: string;
  name: string;
  description?: string;
  cards: Card[];
} 