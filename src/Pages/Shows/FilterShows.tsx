import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { setShowFilters } from "../../store/tvShowsReducer";

function FilterShows() {
  const { results, allShowsFilter } = useSelector(
    (state: RootState) => state.tvShows
  );
  const dispatch = useDispatch<AppDispatch>();

  const uniqueShowTypes = Array.from(
    new Set(results.map((item) => item?.type))
  );

  return (
    <div className="gap-5 grid grid-cols-4">
      <LabelComponent
        uniqueShowFilter={uniqueShowTypes}
        value={allShowsFilter.showType}
        onChange={(value) =>
          dispatch(setShowFilters({ name: "showType", value }))
        }
      />
    </div>
  );
}

const LabelComponent = ({
  uniqueShowFilter,
  value,
  onChange,
}: {
  uniqueShowFilter: string[];
  value: string;
  onChange: (value: string) => void;
}) => (
  <div className="max-w-xs">
    <label
      htmlFor="type-select"
      className="block mb-1 font-medium text-gray-700 text-base"
    >
      Show Type
    </label>
    <select
      id="type-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="block bg-white px-4 py-2 border border-gray-300 focus:border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-gray-900"
    >
      <option value="">All Shows</option>
      {uniqueShowFilter.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  </div>
);

export default FilterShows;
