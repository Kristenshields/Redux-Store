import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { updateCategories, updateCurrentCategory } from '../../redux/slices/categorySlice';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function CategoryMenu() {
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.categories);
  const { loading, data } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (!loading && data?.categories) {
      const fetchedCategories = data.categories;
      dispatch(updateCategories(fetchedCategories));

      fetchedCategories.forEach(category => {
        idbPromise('categories', 'put', category);
      });
    } 
  }, [data, dispatch, loading]);

    
  const handleCategoryClick = (categoryId) => {
    dispatch(updateCurrentCategory(categoryId));
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {loading ? (
        <p>loading categories...</p>
      ) : data?.categories ? (
     <>
      {categories.map(category => (
        <button
          key={category._id}
          onClick={() => 
            handleCategoryClick(category._id)}
        >
          {category.name}
        </button>
      ))}
      <button
        onClick={() => 
          handleCategoryClick('')}>All</button>
      </>
      ) : (
        <p>No categories found.</p>
      )}
    </div>
  );
}

export default CategoryMenu;