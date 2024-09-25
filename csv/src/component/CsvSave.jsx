import React from 'react'; // Reactをインポート
import Papa from 'papaparse'; // PapaParseをインポート（CSVの生成用）
import { saveAs } from 'file-saver'; // file-saverをインポート（ファイル保存用）

// CSVに商品データを保存する処理を定義したコンポーネント
const CsvSave = ({ itemData }) => {
  
  // CSVファイル保存処理
  const saveToCsv = () => {
    // itemDataが空でないことを確認
    if (itemData.length === 0) {
      alert('保存する商品がありません'); // データがない場合は警告を表示
      return; // 処理を終了
    }
    
    // itemDataをCSV形式に変換
    const csv = Papa.unparse(itemData, { header: true });
    
    if (csv) { // CSV変換が成功した場合
      // Blobオブジェクトを作成（CSVデータをバイナリ形式で扱うため）
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      // CSVファイルとして保存
      saveAs(blob, 'products.csv'); // 'products.csv'という名前で保存
      alert('CSVファイルが保存されました'); // 保存成功のメッセージ
    } else {
      alert('CSVファイルの保存に失敗しました'); // 保存失敗のメッセージ
    }
  };

  // コンポーネントのUI部分を定義
  return (
    <button type="button" onClick={saveToCsv}>
      CSVに保存
    </button>
  );
};

export default CsvSave; // CsvSaveコンポーネントをエクスポート