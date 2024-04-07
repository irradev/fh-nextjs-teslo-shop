import { CategoryByGenderView } from '@/modules/products/categories/CategoryByGenderView';
import { Gender } from '@/modules/products/interfaces';

interface Props {
  params: {
    gender: Gender;
  };
}

export default function CategoryPage({ params }: Props) {
  const { gender } = params;

  return <CategoryByGenderView gender={gender} />;
}
