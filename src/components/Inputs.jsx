import React from "react";
import { FormControl, TextField, Select } from "@material-ui/core";
import styles from "./Input.module.css";

const Inputs = ({
  currencyOptions,
  selectedCurrency,
  onChangeCurrency,
  amount,
  onChangeAmount,
}) => {
  return (
    <div>
      <FormControl>
        <TextField
          type="number"
          label="Amount"
          variant="outlined"
          value={amount}
          onChange={onChangeAmount}
        />
      </FormControl>
      <FormControl variant="filled">
        <Select
          native
          value={selectedCurrency}
          onChange={onChangeCurrency}
          className={styles.form}
        >
          {currencyOptions.map((item, index) => (
            <option key={index}>{item}</option>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Inputs;
