import styles from "../search-user/styles.module.css";
const SearchUser = ({ onChange }) => {
  const handleChange = e => {
    onChange(e.target.value);
  };

  return (
    <input
      onChange={handleChange}
      className={styles.container}
      type="text"
      placeholder="Buscar amigo"
    />
  );
};

export default SearchUser;
