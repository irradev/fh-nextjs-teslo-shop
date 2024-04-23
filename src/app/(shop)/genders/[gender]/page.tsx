export const revalidate = 60; // 60 seconds

import { ProductsByGenderView } from '@/modules/products/ProductsByGenderView';
import type { Gender } from '@/modules/products/interfaces';

interface Props {
  params: {
    gender: string;
  };
  searchParams: {
    page?: string;
  };
}

export default function GenderPage({ params, searchParams }: Props) {
  return (
    <ProductsByGenderView
      gender={params.gender as Gender}
      searchParams={searchParams}
    />
  );
}
