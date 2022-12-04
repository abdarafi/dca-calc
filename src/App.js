import React, { useState } from "react";
import { Col, Input, Layout, Row, Tooltip, Select } from "antd";

const { Header, Content } = Layout;

const formatNumber = (value: number) => new Intl.NumberFormat().format(value);

const Result = (props) => {
  return (
    <div>
      <Header>
        <h3>Your allocation:</h3>
      </Header>
      <Content>
        {"Money Market: " + Math.ceil(props.inputValue * props.profile[0])}
      </Content>
      <Content>
        {"Bonds: " + Math.ceil(props.inputValue * props.profile[1])}
      </Content>
      <Content>
        {"Equity: " + Math.ceil(props.inputValue * props.profile[2])}
      </Content>
    </div>
  );
};

const Calculator = () => {
  const [value, setValue] = useState("");
  const [risk, setRisk] = useState(0);

  const risks = {
    0: [0.47, 0.43, 0.1],
    1: [0.1, 0.48, 0.42],
    2: [0.1, 0.2, 0.7],
  };

  const handleSelect = (profile: number) => {
    setRisk(profile);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === "" || inputValue === "-") {
      setValue(inputValue);
    }
  };

  // '.' at the end or only '-' in the input box.
  const handleBlur = () => {
    let valueTemp = value;
    if (value.charAt(value.length - 1) === "." || value === "-") {
      valueTemp = value.slice(0, -1);
    }
    setValue(valueTemp.replace(/0*(\d+)/, "$1"));
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
            <Select
              placeholder="Select your risk profile"
              style={{ width: 200 }}
              onChange={handleSelect}
              options={[
                {
                  value: 0,
                  label: "Conservative",
                },
                {
                  value: 1,
                  label: "Moderate",
                },
                {
                  value: 2,
                  label: "Aggresive",
                },
              ]}
            />
            <Tooltip
              trigger={["focus"]}
              title={title}
              placement="topLeft"
              overlayClassName="numeric-input"
            >
              <Input
                style={{ width: 200 }}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Your amount"
                maxLength={16}
              />
            </Tooltip>
          </h3>
          <Result inputValue={value} profile={risks[risk]} />
        </Col>
      </Row>
    </div>
  );
};

const App: React.FC = () => {
  return <Calculator style={{ width: 120 }} />;
};

export default App;
