import { useEffect, useState } from "react";
import bootstrapIcons from "../assets/bootstrap-icons.svg";
import { Link } from "react-router-dom";
import { categoryAPI } from "./CategoryAPI";
import { ICategory } from "./Icategory";
import CategoryCard from "./CategoryCard";
import toast from "react-hot-toast";
import CategoryCardSkeleton from "./CategoryCardSkeleton";

function CategoriesPage() {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<ICategory[]>([]);
  const categoryCardSkeleton = Array.from(Array(12), (_value, index) => (
    <CategoryCardSkeleton key={index} />
  ));

  async function loadStaff() {
    setLoading(true);
    try {
      const categoryData = await categoryAPI.list();
      setCategory(categoryData);
    } catch (error: any) {
      toast.error(error.message, { duration: 6000 });
    } finally {
      setLoading(false);
    }
  }
  function removeCategory(categoryToRemove: ICategory) {
    setCategory((current) => current.filter((s) => s.id !== categoryToRemove.id));
  }

  useEffect(() => {
    loadStaff();
  }, []);

  return (
    <section className="content container-fluid mx-5 my-2 py-4">
      <div className="d-flex justify-content-between pb-4 mb-4 border-bottom border-2">
        <h2>Categories</h2>
        <Link to="/categories/create" className="btn btn-primary">
          <svg
            className="bi pe-none me-2"
            width={32}
            height={32}
            fill="#FFFFFF"
          >
            <use xlinkHref={`${bootstrapIcons}#plus`} />
          </svg>Add Category
        </Link>
      </div>

      <section className="list d-flex flex-row flex-wrap bg-light gap-5 p-4 rounded-4">
        {loading && categoryCardSkeleton}
        {category.map((categorymember) => (
          <CategoryCard
            key={categorymember.id}
            category={categorymember}
            onRemove={removeCategory}
          />
        ))}
      </section>
    </section>
  );
}

export default CategoriesPage;
