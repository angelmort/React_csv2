import React from 'react';

// 商品リストのコンポーネント
const ItemList = ({ filteredItems, selectedItems, handleCheckboxChange, deleteSelectedItems }) => {
  return (
    <div className="item-list-container"> {/* 商品リストを表示するコンテナ */}
      <ul>
        {filteredItems.map((item, filteredIndex) => ( // フィルタリングされたアイテムをマッピングして表示
          <li key={item.originalIndex}> {/* 各商品のユニークなキー */}
            <input
              type="checkbox" // チェックボックスを表示
              checked={selectedItems.includes(item.originalIndex)} // 選択された商品のチェック状態を設定
              onChange={() => handleCheckboxChange(filteredIndex)} // チェックボックスが変更されたときに呼び出される関数
            />
            <span>
              {item.itemName}, {item.itemCode}, {item.description}
            </span> {/* 商品名、商品コード、商品説明を表示 */}
          </li>
        ))}
      </ul>

      {/* 選択された商品がある場合に削除ボタンを表示 */}
      {selectedItems.length > 0 && (
        <button 
          type="button" 
          onClick={deleteSelectedItems} // 削除ボタンがクリックされたときに呼び出される関数
          className="delete-button"
        >
          選択された商品を削除
        </button>
      )}
    </div>
  );
};

export default ItemList; // ItemListコンポーネントをエクスポート