import PropTypes from "prop-types";

function Input({ currencies, onChange, select, name }) {
  return (
    <>
      {!select ? (
        <input
          className="block p-2.5 w-1/2 z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
          type="number"
          name={name}
          id={name}
          onChange={onChange}
        />
      ) : (
        <select
          name={name}
          id={name}
          onChange={onChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {currencies.map((currency, idx) => (
            <option
              key={idx}
              value={currency}
              defaultValue={currency === "USD"}
            >
              {currency}
            </option>
          ))}
        </select>
      )}
    </>
  );
}

Input.propTypes = {
  name: PropTypes.string,
  currencies: PropTypes.array,
  onChange: PropTypes.func,
  select: PropTypes.bool,
};

export default Input;
