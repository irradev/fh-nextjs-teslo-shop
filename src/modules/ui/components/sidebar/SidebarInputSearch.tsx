import { IoSearchOutline } from 'react-icons/io5';

export const SidebarInputSearch = () => {
  return (
    <div className="relative mt-20 mb-10 ">
      <IoSearchOutline
        size={20}
        className="absolute top-3 left-2"
      />
      <input
        type="text"
        placeholder="Buscar..."
        className="w-full bg-gray-50  pl-10 py-2 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};
