

const SearchBar = ({ value, onChange, onSubmit }) => {
    return (
        <form onSubmit={onSubmit} className="">
            <div className="flex justify-center w-full">
                <input name="query" value={value} onChange={onChange} placeholder="Search for a place.." className="px-3 py-2 w-full max-w-md border rounded" />
            </div>
        </form>
    );
};
export default SearchBar;
