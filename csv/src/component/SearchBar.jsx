import React from 'react'; // Reactをインポート

// 商品検索バーのコンポーネント
const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-bar">
      <h3>商品検索</h3> {/* 検索バーのタイトル */}

      {/* 検索入力フィールド */}
      <input
        type="text"
        value={searchTerm} // 現在の検索語を表示
        onChange={onSearchChange} // 入力変更時に呼び出される関数
        placeholder="商品名で検索" // プレースホルダーとして表示するテキスト
      />
    </div>
  );
};

export default SearchBar; // SearchBarコンポーネントをエクスポート