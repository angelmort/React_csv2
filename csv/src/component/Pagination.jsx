import React from 'react'; // Reactをインポート

// ページネーションのコンポーネント
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination">
      {/* 前のページへ移動するボタン */}
      <button 
        onClick={() => onPageChange(currentPage - 1)} // クリック時に前のページに移動
        disabled={currentPage === 1} // 現在のページが1の場合は無効
      >
        前へ
      </button>

      {/* 現在のページと総ページ数を表示 */}
      <span>
        {currentPage} / {totalPages} {/* 例: 1 / 5 */}
      </span>

      {/* 次のページへ移動するボタン */}
      <button 
        onClick={() => onPageChange(currentPage + 1)} // クリック時に次のページに移動
        disabled={currentPage === totalPages} // 現在のページが最終ページの場合は無効
      >
        次へ
      </button>
    </div>
  );
};

export default Pagination; // Paginationコンポーネントをエクスポート