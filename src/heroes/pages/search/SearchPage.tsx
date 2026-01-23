import { CustomJumbotron } from '@/components/custom/CustomJumbotron';
import { HeroStats } from '@/heroes/components/HeroStats';
import { SearchControls } from './ui/SearchControls';
import { CustomBreadcrumbs } from '@/components/custom/CustomBreadcrumbs';

export const SearchPage = () => {
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
    </>
  );
};

export default SearchPage;
