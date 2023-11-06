import { useEffect, useRef, useState } from "react";
import ProductItem from "../Componets/ProductItem";
import useProducts from "../Hooks/useProducts";

const ProductionSection = () => {
  const { products } = useProducts();
  const [showProduct, setShowProduct] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const dragOverProducts = useRef(0);
  const draggedOverProduct = useRef(0);

  // load data
  useEffect(() => {
    setShowProduct(products);
  }, [products]);

  // toggle check box
  const toggleCheckBox = (item) => {
    if (checkedItems?.some((CI) => CI == item)) {
      return setCheckedItems(checkedItems.filter((data) => data !== item));
    } else {
      return setCheckedItems([...checkedItems, item]);
    }
  };

  // Delete Items function
  const deleteSelectedItem = (items) => {
    const filtered = showProduct.filter((product) => {
      const removeItem = items.includes(product._id);
      return !removeItem;
    });

    setCheckedItems([]);
    setShowProduct(filtered);
  };

  // drag and drop sorting
  function handleSort() {
    const productClone = [...showProduct];

    const temp = productClone[dragOverProducts.current];
    productClone[dragOverProducts.current] =
      productClone[draggedOverProduct.current];
    productClone[draggedOverProduct.current] = temp;

    // set show product
    return setShowProduct(productClone);
  }

  const DragOver = (e) => {
    e.preventDefault();
    const productClone = [...showProduct];

    const temp = productClone[dragOverProducts.current];
    productClone[dragOverProducts.current] =
      productClone[draggedOverProduct.current];
    productClone[draggedOverProduct.current] = temp;

    // set show product
    return setShowProduct(productClone);
  };

  return (
    <section className="bg-[#edf2f7] min-h-screen py-5 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className=" bg-white rounded-md shadow-sm">
          {/* section Header part */}
          <nav className="bg-white border-b border-[#c0c0c094] px-4 md:px-8 py-4 sticky top-0 z-10 ">
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-bold bg-white">
                {checkedItems?.length
                  ? `${checkedItems?.length} Files Selected`
                  : "Gallery"}
              </h1>

              <div>
                {checkedItems?.length > 0 && (
                  <button
                    onClick={() => deleteSelectedItem(checkedItems)}
                    className="text-lg text-red-500 font-semibold"
                  >
                    Delete Files
                  </button>
                )}
              </div>
            </div>
          </nav>

          {/* section body content */}
          <div className="px-4 md:px-8 py-5 md:py-10">
            <div className="grid items-start justify-between grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 grid-flow-row-dense min-w-full">
              {showProduct &&
                showProduct.map((product, idx) => (
                  <ProductItem
                    key={idx}
                    idx={idx}
                    product={product}
                    toggleCheckBox={toggleCheckBox}
                    checkedItems={checkedItems}
                    handleSort={handleSort}
                    dragOverProducts={dragOverProducts}
                    draggedOverProduct={draggedOverProduct}
                    DragOver={DragOver}
                  />
                ))}

              <div className="row-span-2 col-span-1 border rounded-lg  w-full md:min-w-[14.375rem] md:min-h-[8rem] md:h-[90%] h-[9rem]">
                <label
                  className="w-full h-full flex flex-col gap-6 items-center justify-center text-center text-xl cursor-pointer"
                  htmlFor="imageUpload"
                >
                  <span className="">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      version="1.1"
                      viewBox="0 0 16 16"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M14.998 2c0.001 0.001 0.001 0.001 0.002 0.002v11.996c-0.001 0.001-0.001 0.001-0.002 0.002h-13.996c-0.001-0.001-0.001-0.001-0.002-0.002v-11.996c0.001-0.001 0.001-0.001 0.002-0.002h13.996zM15 1h-14c-0.55 0-1 0.45-1 1v12c0 0.55 0.45 1 1 1h14c0.55 0 1-0.45 1-1v-12c0-0.55-0.45-1-1-1v0z"></path>
                      <path d="M13 4.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5 0.672-1.5 1.5-1.5 1.5 0.672 1.5 1.5z"></path>
                      <path d="M14 13h-12v-2l3.5-6 4 5h1l3.5-3z"></path>
                    </svg>
                  </span>

                  <p className="capitalize font-semibold"> add images </p>
                </label>
                <input
                  className="hidden"
                  type="file"
                  name="image upload"
                  id="imageUpload"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductionSection;
