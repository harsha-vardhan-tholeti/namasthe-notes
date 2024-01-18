import { useEffect, useState } from "react";
import "./App.css";
import Input from "./components/input/Input";

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [convert, setConvert] = useState({
    amount: 0,
    from: "INR",
    to: "USD",
  });
  const [convertedCurrency, setConvertedCurrency] = useState(null);

  useEffect(() => {
    const fetchCurrenciesDataSet = async () => {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();
      setCurrencies((prevCurrencies) => [
        ...prevCurrencies,
        ...Object.keys(data),
      ]);
    };
    fetchCurrenciesDataSet();
  }, []);

  const handleConvertData = (e) => {
    const { name, value } = e.target;
    setConvert({ ...convert, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const convertCurrency = async () => {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${convert.amount}&from=${convert.from}&to=${convert.to}`
      );
      const data = await res.json();

      setConvertedCurrency(Object.values(data.rates)[0]);
    };
    convertCurrency();
  };

  return (
    <>
      <div className="h-screen w-screen bg-[#8FC0A9]">
        <form
          onSubmit={handleSubmit}
          className="h-full flex justify-center items-center"
        >
          <div className="w-3/4 flex flex-col justify-center items-center bg-[#C8D5B9] p-10 rounded-3xl">
            <div className="w-full flex flex-col justify-around items-center">
              <Input name="amount" onChange={handleConvertData} />
              <div className="w-full flex justify-evenly mt-8">
                <Input
                  name="from"
                  currencies={currencies}
                  onChange={handleConvertData}
                  select={true}
                />
                <Input
                  name="to"
                  currencies={currencies}
                  onChange={handleConvertData}
                  select={true}
                />
              </div>
            </div>
            <div className="w-full flex flex-col justify-around items-center mt-16">
              {convertedCurrency && (
                <div>
                  <p>{convertedCurrency.toFixed(2)}</p>
                </div>
              )}
              <button>Convert</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
