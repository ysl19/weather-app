import type React from "react";

type SearchBarProps = {
  value: string;

  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;

  onSubmit: (
    e: React.SyntheticEvent<HTMLFormElement>
  ) => void;
};

const SearchBar = ({
  value,
  onChange,
  onSubmit,
}: SearchBarProps) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="flex justify-center w-full">
        <input
          name="query"
          value={value}
          onChange={onChange}
          placeholder="Search for a place.."
          className="px-3 py-2 w-1/2 max-w-md border rounded"
        />
      </div>
    </form>
  );
};

export default SearchBar;