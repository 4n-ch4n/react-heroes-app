import type { Hero } from '../types/hero.interface';
import { HeroGridCard } from './HeroGridCard';

interface Props {
  characters: Hero[];
}

export const HeroGrid = ({ characters }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
      {characters.map((character) => (
        <HeroGridCard key={character.id} character={character} />
      ))}
    </div>
  );
};
