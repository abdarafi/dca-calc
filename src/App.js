import React, { useState } from "react";
import { Col, Input, Layout, Row, Tooltip } from "antd";

const { Header, Content } = Layout;

interface NumericInputProps {
  style: React.CSSProperties;
  value: string;
  onChange: (value: string) => void;
}

const formatNumber = (value: number) => new Intl.NumberFormat().format(value);

const Result = (props) => {
  return (
    <div>
      <Header>
        <h3>Your allocation:</h3>
      </Header>
      <Content>{"Money Market: " + Math.ceil(props.inputValue * 0.1)}</Content>
      <Content>{"Bonds: " + Math.ceil(props.inputValue * 0.48)}</Content>
      <Content>{"Equity: " + Math.ceil(props.inputValue * 0.42)}</Content>
    </div>
  );
};

const Calculator = (props: NumericInputProps) => {
  const { value, onChange } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === "" || inputValue === "-") {
      onChange(inputValue);
    }
  };

  // '.' at the end or only '-' in the input box.
  const handleBlur = () => {
    let valueTemp = value;
    if (value.charAt(value.length - 1) === "." || value === "-") {
      valueTemp = value.slice(0, -1);
    }
    onChange(valueTemp.replace(/0*(\d+)/, "$1"));
  };

  const title = value ? (
    <span className="numeric-input-title">
      {value !== "-" ? formatNumber(Number(value)) : "-"}
    </span>
  ) : (
    "Input a number"
  );

  return (
    <div>
      <Row>
        <Col span={12}>
          <h3>
            <Tooltip
              trigger={["focus"]}
              title={title}
              placement="topLeft"
              overlayClassName="numeric-input"
            >
              <Input
                {...props}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Your amount"
                maxLength={16}
              />
            </Tooltip>
          </h3>
        </Col>
        <Col span={12}>
          <Result inputValue={value} />
        </Col>
      </Row>
    </div>
  );
};

const App: React.FC = () => {
  const [value, setValue] = useState("");

  return (
    <Calculator style={{ width: 120 }} value={value} onChange={setValue} />
  );
};

export default App;
