import { use } from 'react';
import { useNavigate } from 'react-router';
import { Heart, Eye, Zap, Brain, Gauge, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { Hero } from '../types/hero.interface';
import { FavoriteHeroContext } from '../context/FavoriteHeroContext';

interface Props {
  character: Hero;
}

export const HeroGridCard = ({ character }: Props) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = use(FavoriteHeroContext);

  const handleClick = () => {
    navigate(`/heroes/${character.slug}`);
  };

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-linear-to-br from-white to-gray-50">
      <div className="relative h-64">
        <img
          src={character.image}
          alt={character.slug}
          className="object-cover transition-all duration-500 group-hover:scale-110 absolute -top-7.5 w-full h-102.5"
          onClick={handleClick}
        />

        <div className="absolute top-3 left-3 flex items-center gap-2">
          <div
            className={cn(
              character.status === 'Active' ? 'bg-green-500' : 'bg-red-500',
              'w-3 h-3 rounded-full',
            )}
          />
          <Badge
            variant="secondary"
            className="text-xs bg-white/90 text-gray-700"
          >
            {character.status}
          </Badge>
        </div>

        <Badge
          className={cn(
            character.universe === 'DC' ? 'bg-blue-600' : 'bg-red-600',
            'absolute top-3 right-3 text-xs  text-white',
          )}
        >
          {character.universe}
        </Badge>

        <Button
          size="sm"
          variant="ghost"
          className="absolute bottom-3 right-3 bg-white/90 hover:bg-white"
          onClick={() => toggleFavorite(character)}
        >
          <Heart
            className={cn(
              isFavorite(character)
                ? 'fill-red-500 text-red-500'
                : 'text-gray-500',
              'h-4 w-4',
            )}
          />
        </Button>

        <Button
          size="sm"
          variant="ghost"
          className="absolute bottom-3 left-3 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleClick}
        >
          <Eye className="h-4 w-4 text-gray-600" />
        </Button>
      </div>

      <CardHeader className="py-3 z-10 bg-gray-100/50 backdrop-blur-sm relative top-1 group-hover:-top-2.5 transition-all duration-300">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="font-bold text-lg leading-tight">
              {character.alias}
            </h3>
            <p className="text-sm text-gray-600">{character.name}</p>
          </div>
          <Badge className="text-xs bg-green-100 text-green-800 border-green-200">
            {character.category}
          </Badge>
        </div>
        <Badge variant="outline" className="w-fit text-xs">
          {character.team}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 line-clamp-2">
          {character.description}
        </p>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Zap className="h-3 w-3 text-orange-500" />
              <span className="text-xs font-medium">Strength</span>
            </div>
            <Progress
              value={character.strength * 10}
              className="h-2"
              activeColor="bg-orange-500"
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Brain className="h-3 w-3 text-blue-500" />
              <span className="text-xs font-medium">Intelligence</span>
            </div>
            <Progress
              value={character.intelligence * 10}
              className="h-2"
              activeColor="bg-blue-500"
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Gauge className="h-3 w-3 text-green-500" />
              <span className="text-xs font-medium">Speed</span>
            </div>
            <Progress
              value={character.speed * 10}
              className="h-2"
              activeColor="bg-green-500"
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-purple-500" />
              <span className="text-xs font-medium">Durability</span>
            </div>
            <Progress
              value={character.durability * 10}
              className="h-2"
              activeColor="bg-purple-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-sm">Powers:</h4>
          <div className="flex flex-wrap gap-1">
            {character.powers.slice(0, 2).map((power) => (
              <Badge key={power} variant="outline" className="text-xs">
                {power}
              </Badge>
            ))}
            {character.powers.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{character.powers.length - 2} more
              </Badge>
            )}
          </div>
        </div>

        <div className="text-xs text-gray-500 pt-2 border-t">
          First appeared: {character.firstAppearance}
        </div>
      </CardContent>
    </Card>
  );
};
