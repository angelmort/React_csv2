//CSV保存機能をコンポーネント化

import React from 'react';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';

// CSVに商品データを保存する処理
const CsvSave = ({ itemData }) => {
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

    return (
        <button type="button" onClick={saveToCsv}>
          CSVに保存
        </button>
      );
    };
    
export default CsvSave;
