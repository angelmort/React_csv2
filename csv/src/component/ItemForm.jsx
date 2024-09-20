//商品登録のフォームをコンポーネント化

import React from 'react';

const ItemForm = ({ itemName, itemCode, description, handleInputChange, 
  validationErrors, saveToItem }) => {
  return (
    <div>
      <h1>商品登録フォーム</h1>
      <form>
        <input
          type="text"
          name="itemName"
          value={itemName}
          onChange={handleInputChange}
          placeholder="商品名"
        />
        {validationErrors.itemName && <p className="error">{validationErrors.itemName}</p>}
        <br />
        <input
          type="text"
          maxLength="6"
          name="itemCode"
          value={itemCode}
          onChange={handleInputChange}
          placeholder="商品コード"
        />
        {validationErrors.itemCode && <p className="error">{validationErrors.itemCode}</p>}
        <br />
        <textarea
          name="description"
          rows="3"
          cols="30"
          value={description}
          onChange={handleInputChange}
          placeholder="商品説明"
        ></textarea>
        {validationErrors.description && <p className="error">{validationErrors.description}</p>}
        <br />
        <button type="button" onClick={saveToItem} disabled={Object.keys(validationErrors).length > 0}>
          登録
        </button>
      </form>
    </div>
  );
};

export default ItemForm;
