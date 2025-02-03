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
    if (data?.categories) {
      const newCategories = data.categories;

      
      // Check if categories have actually changed before updating Redux state
      const categoriesAreDifferent =
        JSON.stringify(categories.map(c => c._id).sort()) !==
        JSON.stringify(newCategories.map(c => c._id).sort());

      if (categoriesAreDifferent) {
        dispatch(updateCategories(newCategories));

        // Ensure IndexedDB doesn't store duplicates
        const uniqueCategories = new Map(newCategories.map(c => [c._id, c]));
        uniqueCategories.forEach(category => {
          idbPromise('categories', 'put', category);
        });
      }
    } else if (!loading && categories.length === 0) {
      idbPromise('categories', 'get').then(storedCategories => {
        if (storedCategories.length > 0) {
          dispatch(updateCategories(storedCategories));
        }
      });
    }
  }, [data, loading, dispatch]); 
  
  const handleClick = id => {
    dispatch(updateCurrentCategory(id));
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
      <button
        onClick={() => {
          handleClick('');
        }}
      >
        All
      </button>
    </div>
  );
}

export default CategoryMenu;