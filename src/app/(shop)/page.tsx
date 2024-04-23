export const revalidate = 60; // 60 seconds

import { HomeView } from '@/modules/home/HomeView';

interface Props {
  searchParams: {
    page?: string;
  };
}

export default function Home({ searchParams }: Props) {
  return <HomeView searchParams={searchParams} />;
}
