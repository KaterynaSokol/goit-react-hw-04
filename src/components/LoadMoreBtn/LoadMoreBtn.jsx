import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = () => {
  return (
    <div>
      <button type="button" className={css.btn}>
        Load More
      </button>
    </div>
  );
};

export default LoadMoreBtn;
