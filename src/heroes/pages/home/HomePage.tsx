import { useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CustomJumbotron } from '@/components/custom/CustomJumbotron';
import { CustomPagination } from '@/components/custom/CustomPagination';
import { HeroStats } from '@/heroes/components/HeroStats';
import { HeroGrid } from '@/heroes/components/HeroGrid';
import { CustomBreadcrumbs } from '@/components/custom/CustomBreadcrumbs';
import { useHeroSummary } from '@/heroes/hooks/useHeroSummary';
import { usePaginatedHero } from '@/heroes/hooks/usePaginatedHero';

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get('tab') ?? 'all';
  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '6';
  const category = searchParams.get('category') ?? 'all';

  const selectedTab = useMemo(() => {
    const validTabs = ['all', 'favorites', 'heroes', 'villains'];
    return validTabs.includes(activeTab) ? activeTab : 'all';
  }, [activeTab]);

  const { data: summary } = useHeroSummary();
  const { data: heroesResponse } = usePaginatedHero(+page, +limit, category);

  return (
    <>
      <CustomJumbotron
        title="Superheroes universe"
        description="Discover, explore and manage super heroes and villains"
      />

      <CustomBreadcrumbs currentPage="Super heroes" />

      <HeroStats />

      <Tabs value={selectedTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger
            value="all"
            onClick={() =>
              setSearchParams((prev) => {
                prev.set('tab', 'all');
                prev.set('category', 'all');
                prev.set('page', '1');
                return prev;
              })
            }
          >
            All Characters ({summary?.totalHeroes ?? 0})
          </TabsTrigger>
          <TabsTrigger
            value="favorites"
            onClick={() =>
              setSearchParams((prev) => {
                prev.set('tab', 'favorites');
                return prev;
              })
            }
          >
            Favorites (3)
          </TabsTrigger>
          <TabsTrigger
            value="heroes"
            onClick={() =>
              setSearchParams((prev) => {
                prev.set('tab', 'heroes');
                prev.set('category', 'hero');
                prev.set('page', '1');
                return prev;
              })
            }
          >
            Heroes ({summary?.heroCount ?? 0})
          </TabsTrigger>
          <TabsTrigger
            value="villains"
            onClick={() =>
              setSearchParams((prev) => {
                prev.set('tab', 'villains');
                prev.set('category', 'villain');
                prev.set('page', '1');
                return prev;
              })
            }
          >
            Villains ({summary?.villainCount ?? 0})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <HeroGrid characters={heroesResponse?.heroes ?? []} />
        </TabsContent>
        <TabsContent value="favorites">
          <HeroGrid characters={[]} />
        </TabsContent>
        <TabsContent value="heroes">
          <HeroGrid characters={heroesResponse?.heroes ?? []} />
        </TabsContent>
        <TabsContent value="villains">
          <HeroGrid characters={heroesResponse?.heroes ?? []} />
        </TabsContent>
      </Tabs>

      <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
    </>
  );
};
