import { useState, useEffect } from 'react';
import './App.css';
import ItemForm from './component/ItemForm'; // 商品登録用のフォームコンポーネント
import CsvSave from './component/CsvSave'; // CSVファイルに保存するコンポーネント
import CsvLoad from './component/CsvLoad'; // CSVファイルを読み込むコンポーネント
import ItemList from './component/ItemList'; // 登録された商品一覧を表示するコンポーネント

// メインアプリコンポーネント
export const App = () => {
  // 商品情報の状態管理
  const [itemName, setItemName] = useState(''); // 商品名
  const [itemCode, setItemCode] = useState(''); // 商品コード
  const [description, setDescription] = useState(''); // 商品説明
  const [itemData, setItemData] = useState([]); // 登録された商品データ
  const [selectedItems, setSelectedItems] = useState([]); // 選択された商品のインデックス
  const [searchTerm, setSearchTerm] = useState(''); // 検索用のキーワード
  const [currentPage, setCurrentPage] = useState(1); // 現在のページ
  const itemsPerPage = 5; // 1ページあたりの商品数
  const [validationErrors, setValidationErrors] = useState({}); // バリデーションエラーメッセージ

  // 入力フィールドの変更を処理する関数
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'itemName') setItemName(value); // 商品名の更新
    if (name === 'itemCode') setItemCode(value); // 商品コードの更新
    if (name === 'description') setDescription(value); // 商品説明の更新
  };

  // 商品名、商品コード、商品説明のバリデーションを行う
  useEffect(() => {
    const errors = {};
    if (!itemName) errors.itemName = "商品名を入力してください"; // 商品名が空の場合
    if (!itemCode) errors.itemCode = "商品コードを入力してください"; // 商品コードが空の場合
    if (!description) errors.description = "商品説明を入力してください"; // 商品説明が空の場合
    setValidationErrors(errors); // エラーメッセージを状態にセット
  }, [itemName, itemCode, description]);

  // 商品を登録する関数
  const saveToItem = () => {
    // 入力項目が空の場合にアラートを表示
    if (!itemName || !itemCode || !description) {
      alert("全ての項目を入力してください");
      return; // 入力がない場合は処理を中断
    }
  
    const newData = { itemName, itemCode, description };
    setItemData([...itemData, newData]);
    alert('登録しました。');
  
    // フォームの状態をリセット
    setItemName('');
    setItemCode('');
    setDescription('');
  };

  // チェックボックスの変更を処理する関数
  const handleCheckboxChange = (filteredIndex) => {
    const originalIndex = filteredItems[filteredIndex].originalIndex; // 元のインデックスを取得
    if (selectedItems.includes(originalIndex)) {
      setSelectedItems(selectedItems.filter(index => index !== originalIndex)); // 選択解除
    } else {
      setSelectedItems([...selectedItems, originalIndex]); // 選択追加
    }
  };

  // 選択された商品を削除する関数
  const deleteSelectedItems = () => {
    const newItems = itemData.filter((_, index) => !selectedItems.includes(index)); // 選択されていない商品をフィルタリング
    setItemData(newItems); // 商品データを更新
    setSelectedItems([]); // 選択された商品をリセット
  };

  // 検索ボックスの入力を処理する関数
  const handleSearch = (e) => {
    setSearchTerm(e.target.value); // 検索キーワードを更新
  };

  // 検索結果をフィルタリング
  const filteredItems = itemData
    .map((item, index) => ({ ...item, originalIndex: index })) // 商品データに元のインデックスを追加
    .filter((item) => item.itemName.toLowerCase().includes(searchTerm.toLowerCase())); // 検索キーワードでフィルタリング

  // ページネーション用のアイテムを取得
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage); // 総ページ数
  const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage); // 現在のページに表示するアイテム

  // ページ切り替え関数
  const changePage = (direction) => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1); // 次のページへ移動
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1); // 前のページへ移動
    }
  };

  // コンポーネントのレンダリング
  return (
    <div>
      <div className="search-bar">
        <h3>商品検索</h3>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="商品名で検索" // 検索ボックスのプレースホルダー
        />
      </div>

      <div className="item-list-section">
        <h2>CSVファイルを読み込み</h2>
        <CsvLoad setItemData={setItemData} setSelectedItems={setSelectedItems} /> {/* CSVファイルを読み込むコンポーネント */}

        <ItemForm
          itemName={itemName}
          itemCode={itemCode}
          description={description}
          handleInputChange={handleInputChange}
          saveToItem={saveToItem}
          validationErrors={validationErrors} // バリデーションエラーメッセージを渡す
        />

        <div className="item-list-section">
          <div className="item-list-header">
            <h2>登録された商品一覧</h2>
            <CsvSave itemData={itemData} /> {/* CSVファイルに保存するコンポーネント */}
          </div>
          <ItemList
            filteredItems={currentItems} // 現在のページに表示するアイテムを渡す
            selectedItems={selectedItems}
            handleCheckboxChange={handleCheckboxChange} // チェックボックスの変更処理を渡す
            deleteSelectedItems={deleteSelectedItems} // 削除処理を渡す
          />

          {/* ページネーション */}
          <div className="pagination">
            <button onClick={() => changePage('prev')} disabled={currentPage === 1}>
              前へ
            </button>
            <span>{currentPage} / {totalPages}</span> {/* 現在のページと総ページ数を表示 */}
            <button onClick={() => changePage('next')} disabled={currentPage === totalPages}>
              次へ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App; // Appコンポーネントをエクスポート