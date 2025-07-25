import react from "react";
import months from "../../utils/monthDropdown";
import years from "../../utils/yearDropdown";
import "../../styles/TransactionFilter.css";

export default function TransactionFilter({
  selectedFilterMonth,
  selectedFilterYear,
  onMonthChange,
  onYearChange,
}) {
  const handleFilterMonthChange = (e) => {
    onMonthChange(Number(e.target.value));
  };

  const handleFilteryearChange = (e) => {
    onYearChange(Number(e.target.value));
  };

  return (
    <div className="transaction-filter">
      <label>
        <select value={selectedFilterMonth} onChange={handleFilterMonthChange}>
          {months.map((month) => (
            <option key={month.id} value={month.id}>
              {month.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        <select value={selectedFilterYear} onChange={handleFilteryearChange}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
