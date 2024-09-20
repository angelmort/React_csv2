import { useState, useRef, useEffect } from 'react';
//import Papa from 'papaparse';
import './App.css';
import ItemForm from './component/ItemForm'; // ItemFormをインポート
import CsvSave from './component/CsvSave'; // CsvSaveをインポート
import CsvLoad from './component/CsvLoad'; // CsvLoadコンポーネントをインポート

export const App = () => {
  const [itemName, setItemName] = useState('');
  const [itemCode, setItemCode] = useState('');
  const [description, setDescription] = useState('');
  const [itemData, setItemData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');　//商品の検索キーワード
  const [currentPage, setCurrentPage] = useState(1); // ページネーション用
  const itemsPerPage = 10; // 1ページあたりの商品数
  const [validationErrors, setValidationErrors] = useState({});
  //const fileInputRef = useRef(null);

  // フォームに入力された内容を反映する処理
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'itemName') setItemName(value);
    if (name === 'itemCode') setItemCode(value);
    if (name === 'description') setDescription(value);
  };

  // バリデーションチェック
  useEffect(() => {
    const errors = {};
    if (!itemName) errors.itemName = "商品名を入力してください";
    if (!itemCode) errors.itemCode = "商品コードを入力してください";
    if (!description) errors.description = "商品説明を入力してください";
    setValidationErrors(errors);
  }, [itemName, itemCode, description]);

  // 入力された内容を保存する処理
  const saveToItem = () => {
    const newData = { itemName, itemCode, description };
    setItemData([...itemData, newData]);
    alert('登録しました。');
    setItemName('');
    setItemCode('');
    setDescription('');
  };

  // チェックボックスの変更を処理する関数
  const handleCheckboxChange = (filteredIndex) => {
    const originalIndex = filteredItems[filteredIndex].originalIndex;
    if (selectedItems.includes(originalIndex)) {
      setSelectedItems(selectedItems.filter(index => index !== originalIndex));
    } else {
      setSelectedItems([...selectedItems, originalIndex]);
    }
  };

  // 選択されたアイテムを削除する関数
  const deleteSelectedItems = () => {
    const newItems = itemData.filter((_, index) => !selectedItems.includes(index));
    setItemData(newItems);
    setSelectedItems([]);
  };

  // 商品検索処理
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // 検索とページネーション処理
  const filteredItems = itemData
    .map((item, index) => ({ ...item, originalIndex: index })) // originalIndex を付与
    .filter((item) => item.itemName.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(itemData.length / itemsPerPage);

  // ページ切り替え処理
  const changePage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    setSelectedItems([]); // ページ変更時に選択状態をリセット
  };

  return (
    <div>
      <div className="search-bar">
        <h3>商品検索</h3>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="商品名で検索"
        />
      </div>

      <div className="item-list-section">
        <h2>CSVファイルを読み込み</h2>
        <CsvLoad setItemData={setItemData} setSearchTerm={setSearchTerm} />

        <ItemForm
          itemName={itemName}
          itemCode={itemCode}
          description={description}
          handleInputChange={handleInputChange}
          saveToItem={saveToItem}
          validationErrors={validationErrors}
        />

        <div className="item-list-section">
          <div className="item-list-header">
            <h2>登録された商品一覧</h2>
            <CsvSave itemData={itemData} />
          </div>
          <div className="item-list-container">
            <ul>
              {filteredItems.map((item, filteredIndex) => (
                <li key={item.originalIndex}>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.originalIndex)}
                    onChange={() => handleCheckboxChange(filteredIndex)}
                  />
                  <span>{item.itemName}, {item.itemCode}, {item.description}</span>
                </li>
              ))}
            </ul>
          </div>

          {selectedItems.length > 0 && (
            <button type="button" onClick={deleteSelectedItems} className="delete-button">
              選択された商品を削除
            </button>
          )}

          {/* ページネーション */}
          <div className="pagination">
            <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>
              前へ
            </button>
            <span>{currentPage} / {totalPages}</span>
            <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>
              次へ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
