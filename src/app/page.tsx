import Categories from "../components/Categories/Categories";
import MainSwiper from "../components/MainSwiper/MainSwiper";
import Products from "../components/Products/Products";

export default function Home() {
  return (
    <>
      <MainSwiper />
      <Categories />
      <div className="bg-gray-50 py-3">
        <div className='my-10 max-w-7xl m-auto'>
          <div className="max-w-fit m-auto">
            <h2 className='text-center text-5xl font-semibold tracking-tighter pb-3 border-b-2 border-gray-400 mb-6'>
              Products
            </h2>
          </div>
        </div>
        <Products />
      </div>
    </>
  );
}
