// ページネーション用コンポーネント
const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {

  // ページ切り替えを処理する関数
  const changePage = (direction) => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1); // 次のページに移動
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1); // 前のページに戻る
    }
  };

  return (
    <div className="pagination">
      {/* 前のページボタン */}
      <button onClick={() => changePage('prev')} disabled={currentPage === 1}>
        前へ
      </button>
      {/* 現在のページ / 総ページ数 */}
      <span>{currentPage} / {totalPages}</span> 
      {/* 次のページボタン */}
      <button onClick={() => changePage('next')} disabled={currentPage === totalPages}>
        次へ
      </button>
    </div>
  );
};

export default Pagination;