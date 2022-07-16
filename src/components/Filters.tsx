import React, { ChangeEvent } from "react";

type FilterProps = {
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
  setDuration: (duration: string) => void;
  setLevel: (level: string) => void;
};

const Filters: React.FC<FilterProps> = ({ searchValue, setSearchValue, setDuration, setLevel }) => {
  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const onChangeDuration = (event: ChangeEvent<HTMLSelectElement>) => {
    setDuration(event.target.value);
  };

  const onChangeLevel = (event: ChangeEvent<HTMLSelectElement>) => {
    setLevel(event.target.value);
  };

  return (
    <section className="trips-filter">
      <h2 className="visually-hidden">Trips filter</h2>
      <form className="trips-filter__form" autoComplete="off">
        <label className="trips-filter__search input">
          <span className="visually-hidden">Search by name</span>
          <input
            value={searchValue}
            onChange={onChangeInput}
            name="search"
            type="search"
            placeholder="search by title"
          />
        </label>
        <label className="select">
          <span className="visually-hidden">Search by duration</span>
          <select onChange={onChangeDuration} name="duration">
            <option value="">duration</option>
            <option value="0_x_5">&lt; 5 days</option>
            <option value="5_x_10">&lt; 10 days</option>
            <option value="10_x">&ge; 10 days</option>
          </select>
        </label>
        <label className="select">
          <span className="visually-hidden">Search by level</span>
          <select onChange={onChangeLevel} name="level">
            <option value="">level</option>
            <option value="easy">easy</option>
            <option value="moderate">moderate</option>
            <option value="difficult">difficult</option>
          </select>
        </label>
      </form>
    </section>
  );
};

export default Filters;
