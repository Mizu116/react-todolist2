export const Filtering = ({ filter, setFilter }) => {
  return (
    <select
      className="selector"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    >
      <option value="all">全て</option>
      <option value="inactive">着手予定</option>
      <option value="incomplete">着手</option>
      <option value="complete">完了</option>
    </select>
  );
};
