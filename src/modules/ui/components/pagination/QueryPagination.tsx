'use client';

import { redirect, usePathname, useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

import { generatePaginationNumbers } from '@/utils';

interface Props {
  totalPages: number;
  className?: string;
}

export const QueryPagination = ({ totalPages, className }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (isNaN(Number(searchParams.get('page')))) redirect(pathname);

  const currentPage = Number(searchParams.get('page')) || 1;
  const allPages = generatePaginationNumbers(currentPage, totalPages);

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    if (pageNumber === '...') {
      return `${pathname}?${params.toString()}`;
    }

    if (+pageNumber <= 0) {
      return `${pathname}`;
    }

    if (+pageNumber > totalPages) {
      return `${pathname}?${params.toString()}`;
    }

    params.set('page', pageNumber.toString());

    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className={clsx('flex justify-center text-center mb-20', className)}>
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          <PaginationButton
            href={`?page=${currentPage - 1}`}
            isDisabled={currentPage === 1}
          >
            <IoChevronBackOutline
              size={30}
              className={currentPage === 1 ? 'text-gray-500' : 'text-gray-800'}
            />
          </PaginationButton>

          {allPages.map((pageNumber, index) => (
            <PaginationButton
              key={`pagination_button_${index}`}
              href={createPageUrl(pageNumber)}
              isActive={currentPage === pageNumber}
            >
              {pageNumber}
            </PaginationButton>
          ))}

          <PaginationButton
            href={`?page=${currentPage + 1}`}
            isDisabled={currentPage === totalPages}
          >
            <IoChevronForwardOutline
              size={30}
              className={
                currentPage === totalPages ? 'text-gray-500' : 'text-gray-800'
              }
            />
          </PaginationButton>
        </ul>
      </nav>
    </div>
  );
};

interface PaginationButtonProps {
  isActive?: boolean;
  isDisabled?: boolean;
  href: string;
  children: React.ReactNode;
}

function PaginationButton({
  href,
  isActive = false,
  isDisabled = false,
  children,
}: PaginationButtonProps) {
  return (
    <li className={clsx('page-item', { disabled: isDisabled })}>
      <a
        className={clsx(
          'page-link relative block py-1.5 px-3  border-0  outline-none transition-all duration-300 rounded  ',
          {
            'bg-transparent text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none':
              !isActive,
            'bg-blue-600 text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md':
              isActive,
            'text-gray-500 pointer-events-none focus:shadow-none': isDisabled,
          }
        )}
        href={href}
        aria-disabled={isDisabled}
      >
        {children}
        {isActive ? <span className="visually-hidden"></span> : null}
      </a>
    </li>
  );
}
