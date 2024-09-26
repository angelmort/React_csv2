import CsvSave from './CsvSave'; 
import ItemList from './ItemList';
import Pagination from './Pagination';

// 商品一覧セクションコンポーネント
const ItemListSection = ({ currentItems, selectedItems, setSelectedItems, itemData, setItemData, currentPage, totalPages, setCurrentPage }) => {

  // チェックボックスの変更を処理
  const handleCheckboxChange = (filteredIndex) => {
    const originalIndex = currentItems[filteredIndex].originalIndex; // 元のインデックスを取得
    if (selectedItems.includes(originalIndex)) {
      setSelectedItems(selectedItems.filter(index => index !== originalIndex)); // 選択解除
    } else {
      setSelectedItems([...selectedItems, originalIndex]); // 選択追加
    }
  };

  // 選択された商品の削除処理
  const deleteSelectedItems = () => {
    const newItems = itemData.filter((_, index) => !selectedItems.includes(index)); // 選択されていない商品だけを保持
    setItemData(newItems); // 更新
    setSelectedItems([]); // 選択をリセット
  };

  return (
    <div className="item-list-section">
      <div className="item-list-header">
        <h2>登録された商品一覧</h2>
        {/* CSVファイルに保存 */}
        <CsvSave itemData={itemData} />
      </div>

      {/* 商品一覧表示 */}
      <ItemList
        filteredItems={currentItems}
        selectedItems={selectedItems}
        handleCheckboxChange={handleCheckboxChange} // チェックボックスの変更処理
        deleteSelectedItems={deleteSelectedItems} // 商品の削除処理
      />

      {/* ページネーション */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default ItemListSection;