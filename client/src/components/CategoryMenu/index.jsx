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
    if (data && data.categories) {
      dispatch(updateCategories(data.categories));
      data.categories.forEach(category => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading && categories.length === 0) {
      idbPromise('categories', 'get').then(categories => {
        if (categories) {
          dispatch(updateCategories(categories));
        }
      });
    }
  }, [data, loading, dispatch, categories]);

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