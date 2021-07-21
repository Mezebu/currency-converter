import axios from "axios";
import { useEffect, useState } from "react";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Inputs from "./components/Inputs";
import styles from "./App.module.css";

const url = "https://api.exchangerate.host/latest";

const App = () => {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountFromCurrency, setAmountFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    axios.get(url).then(({ data }) => {
      const defaultCurrency = Object.keys(data.rates)[105];
      setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
      setFromCurrency(data.base);
      setToCurrency(defaultCurrency);
      setExchangeRate(data.rates[defaultCurrency]);
    });
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      axios
        .get(`${url}?base=${fromCurrency}&symbols=${toCurrency}&places=${2}`)
        .then(({ data }) => {
          setExchangeRate(data.rates[toCurrency]);
        });
    }
  }, [fromCurrency, toCurrency]);

  const onFromChangeCurrency = (e) => {
    const value = e.target.value;
    setFromCurrency(value);
  };

  const onToChangeCurrency = (e) => {
    const value = e.target.value;
    setToCurrency(value);
  };

  const handleFromAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    setAmountFromCurrency(true);
  };

  const handleToAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    setAmountFromCurrency(false);
  };

  return (
    <div className={styles.App}>
      <h1 className={styles.headerText}>Currency Converter</h1>
      <div className={styles.contents}>
        <Inputs
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeCurrency={onFromChangeCurrency}
          amount={fromAmount}
          onChangeAmount={handleFromAmountChange}
        />
        <div>
          <ArrowDownwardIcon style={{ fontSize: "5rem", padding: "1rem" }} />
        </div>
        <Inputs
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onChangeCurrency={onToChangeCurrency}
          amount={toAmount}
          onChangeAmount={handleToAmountChange}
        />
      </div>
    </div>
  );
};

export default App;
