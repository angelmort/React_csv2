import React from 'react'; // Reactをインポート

// 商品登録フォームのコンポーネント
const ItemForm = ({ 
  itemName, // 商品名の状態
  itemCode, // 商品コードの状態
  description, // 商品説明の状態
  handleInputChange, // 入力変更時のハンドラ
  validationErrors, // バリデーションエラーメッセージ
  saveToItem // 商品保存処理の関数
}) => {
  return (
    <div>
      <h1>商品登録フォーム</h1> {/* フォームのタイトル */}
      <form>
        {/* 商品名入力フィールド */}
        <label htmlFor="itemName">商品名:</label> {/* 商品名のラベル */}
        <input
          type="text"
          name="itemName" // 入力名を設定
          id="itemName" // ラベルと関連付けるためのID
          value={itemName} // 状態から商品名を取得
          onChange={handleInputChange} // 入力変更時の処理
          placeholder="商品名" // プレースホルダー
        />
        {/* バリデーションエラー表示 */}
        {validationErrors.itemName && <p className="error">{validationErrors.itemName}</p>} {/* 商品名が空の場合エラーを表示 */}
        <br />

        {/* 商品コード入力フィールド */}
        <label htmlFor="itemCode">商品コード:</label> {/* 商品コードのラベル */}
        <input
          type="text"
          maxLength="6" // 最大文字数を6に設定
          name="itemCode" // 入力名を設定
          id="itemCode" // ラベルと関連付けるためのID
          value={itemCode} // 状態から商品コードを取得
          onChange={handleInputChange} // 入力変更時の処理
          placeholder="商品コード" // プレースホルダー
        />
        {/* バリデーションエラー表示 */}
        {validationErrors.itemCode && <p className="error">{validationErrors.itemCode}</p>} {/* 商品コードが空の場合エラーを表示 */}
        <br />

        {/* 商品説明入力フィールド */}
        <label htmlFor="description">商品説明:</label> {/* 商品説明のラベル */}
        <textarea
          name="description" // 入力名を設定
          id="description" // ラベルと関連付けるためのID
          rows="3" // 行数を3に設定
          cols="30" // 列数を30に設定
          value={description} // 状態から商品説明を取得
          onChange={handleInputChange} // 入力変更時の処理
          placeholder="商品説明" // プレースホルダー
        ></textarea>
        {/* バリデーションエラー表示 */}
        {validationErrors.description && <p className="error">{validationErrors.description}</p>} {/* 商品説明が空の場合エラーを表示 */}
        <br />

        {/* 商品登録ボタン */}
        <button 
          type="button" 
          onClick={saveToItem} // 商品保存処理を呼び出す
        >
          登録
        </button>
      </form>
    </div>
  );
};

export default ItemForm; // ItemFormコンポーネントをエクスポート