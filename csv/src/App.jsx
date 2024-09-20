import { useState, useRef, useEffect } from 'react';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import './App.css';

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
  const fileInputRef = useRef(null);

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
  }, [itemName, itemCode,description]);

  // 入力された内容を反映する処理
  const saveToItem = () => {
    const newData = { itemName, itemCode, description };
    setItemData([...itemData, newData]);

    alert('登録しました。');
    setItemName('');
    setItemCode('');
    setDescription('');
  };

  // CSVに商品データを保存する処理
  const saveToCsv = () => {
    // itemDataが空でないことを確認
    if (itemData.length === 0) {
      alert('保存する商品がありません');
      return;
    }
    const csv = Papa.unparse(itemData, { header: true });
    if(csv){
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'products.csv');
    alert('CSVファイルが保存されました');
  } else {
    alert('CSVファイルの保存に失敗しました');
      }
    };

  // CSVファイルのアップロード処理
  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    const fileExtension = uploadedFile.name.split('.').pop().toLowerCase();
    if (fileExtension !== 'csv') {
      alert('CSVファイルのみアップロードできます');
      //ファイル入力をクリア
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    if (uploadedFile) {
      Papa.parse(uploadedFile, {
        // 最初の行をヘッダーとして扱う
        header: true,
        complete: (parsedResult) => {
         // 解析されたデータを取得し、必要な項目（itemName, itemCode, description）を抽出
        const processedData = parsedResult.data.map((row) => ({
              itemName: row.itemName,      // 商品名
              itemCode: row.itemCode,      // 商品コード
              description: row.description,// 商品説明
          }));
          setItemData(processedData);
          // 検索条件をクリア
          setSearchTerm(''); 
        },
      });
      // ファイル入力をクリア
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // チェックボックスの変更を処理する関数
const handleCheckboxChange = (filteredIndex) => {
  // フィルタされたアイテムのインデックスから元のアイテムのインデックスを取得
  const originalIndex = filteredItems[filteredIndex].originalIndex;
  if (selectedItems.includes(originalIndex)) {
    setSelectedItems(selectedItems.filter(index => index !== originalIndex));
  } else {
    setSelectedItems([...selectedItems, originalIndex]);
  }
};

// 選択されたアイテムを削除する関数
const deleteSelectedItems = () => {
  console.log('削除前のアイテム:', itemData);
  console.log('選択されたアイテム:', selectedItems);
  // 選択されたアイテムを削除した新しいアイテムリストを作成
  const newItems = itemData.filter((_, index) => !selectedItems.includes(index));
  setItemData(newItems);
  setSelectedItems([]); // チェックをリセット

  console.log('削除後のアイテム:', newItems);
};

  // 商品検索処理
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // 検索とページネーション処理
  const filteredItems = itemData
  .map((item, index) => ({ ...item, originalIndex: index })) // originalIndex を付与
  .filter((item) =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  )
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
          <h1>商品登録フォーム</h1>
          <form>
            <input
              type="text"
              name="itemName"
              value={itemName}
              onChange={handleInputChange}
              placeholder="商品名"
            />
            {validationErrors.itemName && <p className="error">
                {validationErrors.itemName}</p>}
            <br />
            <input
              type="text"
              maxLength="6"
              name="itemCode"
              value={itemCode}
              onChange={handleInputChange}
              placeholder="商品コード"
            />
            {validationErrors.itemCode && <p className="error">
                {validationErrors.itemCode}</p>}
            <br />
            <textarea
              name="description"
              rows="3"
              cols="30"
              value={description}
              onChange={handleInputChange}
              placeholder="商品説明"
            ></textarea>
             {validationErrors.description && <p className="error">
                {validationErrors.description}</p>}
            <br />
            <button type="button" onClick={saveToItem} 
            disabled={Object.keys(validationErrors).length > 0}>
              登録
            </button>
          </form>

        <div className="item-list-section">
          <h2>CSVファイルを読み込み</h2>
          <input type="file" 
          accept=".csv" 
          ref={fileInputRef} 
          onChange={handleFileUpload} />

        <div className="item-list-header">
            <h2>登録された商品一覧</h2>
            <button type="button" onClick={saveToCsv}>
              CSVに保存
            </button>
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
                <span>
                  {item.itemName}, {item.itemCode}, {item.description}
                </span>
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
            <button onClick={() => changePage(currentPage - 1)} 
            disabled={currentPage === 1}>
              前へ
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button onClick={() => changePage(currentPage + 1)} 
            disabled={currentPage === totalPages}>
              次へ
            </button>
          </div>
        </div>
      </div>
  );
};

export default App;