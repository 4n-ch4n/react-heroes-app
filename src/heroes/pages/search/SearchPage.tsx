import { useSearchParams } from 'react-router';
import { CustomJumbotron } from '@/components/custom/CustomJumbotron';
import { HeroStats } from '@/heroes/components/HeroStats';
import { SearchControls } from './ui/SearchControls';
import { CustomBreadcrumbs } from '@/components/custom/CustomBreadcrumbs';
import { useQuery } from '@tanstack/react-query';
import { searchHeroesAction } from '@/heroes/actions/search-heroes.action';
import { HeroGrid } from '@/heroes/components/HeroGrid';

export const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const name = searchParams.get('name') ?? undefined;
  const strength = searchParams.get('strength') ?? undefined;

  const { data: heroesResponse } = useQuery({
    queryKey: ['search', { name, strength }],
    queryFn: () => searchHeroesAction({ name, strength }),
    staleTime: 10000 * 60 * 5,
    retry: false,
  });

  return (
    <>
      <CustomJumbotron
        title="Superheroes Search"
        description="Discover, explore and manage super heroes and villains"
      />

      <CustomBreadcrumbs
        breadCrumbItems={[{ label: 'Search', url: '/search' }]}
        currentPage="Heroes search"
      />

      <HeroStats />

      <SearchControls />

      <HeroGrid characters={heroesResponse ?? []} />
    </>
  );
};

export default SearchPage;
