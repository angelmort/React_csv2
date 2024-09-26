// 商品検索バーコンポーネント
const SearchBar = ({ searchTerm, setSearchTerm }) => {
  
  // 検索キーワードの変更を処理
  const handleSearch = (e) => {
    setSearchTerm(e.target.value); // 検索キーワードを更新
  };

  return (
    <div className="search-bar">
      <h3>商品検索</h3>
      {/* 検索入力フィールド */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="商品名で検索" // プレースホルダー
      />
    </div>
  );
};

export default SearchBar;