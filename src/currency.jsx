import React, { useState } from "react";
import "./App.css";
import "./current.css";
import { FaCircleRight } from "react-icons/fa6";
import axios from "axios";

function Currency() {
  // State tanımlamaları
  const [amount, setAmount] = useState(0); // Miktar
  const [fromCurrency, setFromCurrency] = useState("USD"); // Dönüştürülecek para birimi
  const [toCurrency, setToCurrency] = useState("TRY"); // Hedef para birimi
  const [result, setResult] = useState(0); // Dönüştürülen miktar

  let token = "fca_live_w3xEk6s47q4lA8JTYu3shxjrbtGQU1zxlGORaHbP";
  let baseUrl = "https://api.freecurrencyapi.com/v1/latest";

  // Kullanıcıdan gelen verileri güncellemek için işlevler
  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  // Hesaplama işlevi
  const handleCalculate = () => {
    exchange(); // Döviz kuru hesaplaması yapılıyor
  };

  // Alanları temizlemek için işlev
  const handleClear = () => {
    setAmount(0); // Miktarı sıfırla
    setFromCurrency("USD"); // Başlangıç para birimini sıfırla
    setToCurrency("TRY"); // Hedef para birimini sıfırla
    setResult(0); // Sonucu sıfırla
  };

  // Döviz kuru değişimini gerçekleştiren işlev
  const exchange = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}?apikey=${token}&base_currency=${fromCurrency}`
      );
      const result = (response.data.data[toCurrency] * amount).toFixed(2); // Dönüştürülen miktarı hesapla
      setResult(result); // Sonucu güncelle
    } catch (error) {
      console.log("Hata oluştu: ", error); // Hata durumunda konsola yazdır
    }
  };

  return (
    <div className="container">
      <div>
        <h2>DÖVİZ KURU UYGULAMASI</h2>
      </div>
      <div className="content">
        {/* Miktar ve para birimi seçim alanları */}
        <div className="current-main1">
          <input type="number" value={amount} onChange={handleAmountChange} />
          <select value={fromCurrency} onChange={handleFromCurrencyChange}>
            <option>USD</option>
            <option>EUR</option>
            <option>TRY</option>
          </select>
        </div>
        {/* Değiştirme işareti */}
        <FaCircleRight />
        {/* Hedef para birimi seçim alanı ve sonuç gösterme */}
        <div className="current-main2">
          <select value={toCurrency} onChange={handleToCurrencyChange}>
            <option>TRY</option>
            <option>USD</option>
            <option>EUR</option>
          </select>
          <input type="number" value={result} readOnly />
        </div>
      </div>
      {/* Hesapla ve Temizle butonları */}
      <div className="btn">
        <button className="hesapla" onClick={handleCalculate}>
          HESAPLA
        </button>
        <button className="temizle" onClick={handleClear}>
          TEMİZLE
        </button>
      </div>
    </div>
  );
}

export default Currency;
