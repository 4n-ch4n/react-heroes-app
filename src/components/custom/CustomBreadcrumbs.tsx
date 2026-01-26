import { Fragment } from 'react';
import { Link } from 'react-router';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { DotIcon } from 'lucide-react';

interface Breadcrumb {
  label: string;
  url: string;
}

interface Props {
  currentPage: string;
  breadCrumbItems?: Breadcrumb[];
}

export const CustomBreadcrumbs = ({ currentPage, breadCrumbItems }: Props) => {
  return (
    <Breadcrumb className="my-5">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {breadCrumbItems &&
          breadCrumbItems.map((item) => (
            <Fragment key={item.url}>
              <BreadcrumbSeparator>
                <DotIcon />
              </BreadcrumbSeparator>

              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={item.url}>{item.label}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Fragment>
          ))}

        <BreadcrumbSeparator>
          <DotIcon />
        </BreadcrumbSeparator>

        <BreadcrumbItem>
          <BreadcrumbPage>{currentPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
