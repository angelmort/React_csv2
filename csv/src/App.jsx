import { useState, useEffect } from 'react';
import './App.css';
import ItemForm from './component/ItemForm'; 
//import CsvSave from './component/CsvSave'; 
import CsvLoad from './component/CsvLoad'; 
import ItemListSection from './component/ItemListSection'; 
import SearchBar from './component/SearchBar';

// メインのアプリケーションコンポーネント
export const App = () => {
  // 各入力フィールドと登録商品の状態管理
  const [itemName, setItemName] = useState(''); // 商品名
  const [itemCode, setItemCode] = useState(''); // 商品コード
  const [description, setDescription] = useState(''); // 商品説明
  const [itemData, setItemData] = useState([]); // 登録された商品データ
  const [selectedItems, setSelectedItems] = useState([]); // 選択された商品のインデックス
  const [searchTerm, setSearchTerm] = useState(''); // 検索キーワード
  const [currentPage, setCurrentPage] = useState(1); // 現在のページ番号
  const [validationErrors, setValidationErrors] = useState({}); // 入力バリデーションエラー

  const itemsPerPage = 5; // 1ページに表示するアイテム数

  // 入力フィールドの変更を処理
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'itemName') setItemName(value);
    if (name === 'itemCode') setItemCode(value);
    if (name === 'description') setDescription(value);
  };

  // フォームのバリデーションを監視
  useEffect(() => {
    const errors = {};
    if (!itemName) errors.itemName = "商品名を入力してください";
    if (!itemCode) errors.itemCode = "商品コードを入力してください";
    if (!description) errors.description = "商品説明を入力してください";
    setValidationErrors(errors); // エラーがある場合はエラーメッセージをセット
  }, [itemName, itemCode, description]);

  // 商品を登録する処理
  const saveToItem = () => {
    if (!itemName || !itemCode || !description) {
      alert("全ての項目を入力してください"); // 入力漏れがある場合
      return;
    }
    const newData = { itemName, itemCode, description };
    setItemData([...itemData, newData]); // 新しい商品をリストに追加
    alert('登録しました。');
    
    // 入力フィールドをリセット
    setItemName('');
    setItemCode('');
    setDescription('');
  };

  // 商品名で検索してフィルタリング
  const filteredItems = itemData
    .map((item, index) => ({ ...item, originalIndex: index })) // 元のインデックスを保持
    .filter((item) => item.itemName.toLowerCase().includes(searchTerm.toLowerCase()));

  // ページ数の計算
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage); 
  const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage); 

  return (
    <div>
      {/* 商品検索バー */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* CSVファイル読み込み */}
      <CsvLoad setItemData={setItemData} setSelectedItems={setSelectedItems} />

      {/* 商品登録フォーム */}
      <ItemForm
        itemName={itemName}
        itemCode={itemCode}
        description={description}
        handleInputChange={handleInputChange}
        saveToItem={saveToItem}
        validationErrors={validationErrors}
      />

      {/* 商品リスト表示セクション */}
      <ItemListSection
        currentItems={currentItems}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        itemData={itemData}
        setItemData={setItemData}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default App;