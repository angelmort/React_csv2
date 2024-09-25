import React, { useRef } from 'react'; // ReactとuseRefフックをインポート
import Papa from 'papaparse'; // PapaParseをインポート（CSVパース用）

const CsvLoad = ({ setItemData, setSelectedItems }) => {
  // ファイル入力要素への参照を作成
  const fileInputRef = useRef(null); 

  // ファイル選択時の処理
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // 選択されたファイルを取得
    if (!file) return; // ファイルが選択されていない場合は処理を終了

    // CSVファイルをパースしてデータを取得
    Papa.parse(file, {
      header: true, // ヘッダー行をキーとして使用
      complete: (result) => {
        // パース結果から必要なデータのみを取得
        const parsedData = result.data.filter(item => 
          item.itemName && item.itemCode && item.description
        ); 
        
        // 新しいデータを状態にセット
        setItemData(parsedData); 
        // 選択状態をリセット
        setSelectedItems([]); 
        alert('CSVファイルが読み込まれ、選択状態が初期化されました');
        
        // ファイル選択をリセット（同じファイルを再選択可能に）
        fileInputRef.current.value = null; 
      },
      error: (error) => {
        // 読み込みエラーが発生した場合の処理
        console.error('CSV読み込み中にエラーが発生しました:', error);
        alert('CSVファイルの読み込みに失敗しました');
      }
    });
  };

  return (
    <div>
      {/* CSVファイルの選択入力 */}
      <input
        type="file"
        accept=".csv" // CSVファイルのみ受け付け
        onChange={handleFileChange} // ファイルが選択された時のイベントハンドラ
        ref={fileInputRef} // 参照を追加
      />
    </div>
  );
};

export default CsvLoad; // CsvLoadコンポーネントをエクスポート