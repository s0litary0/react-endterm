import { useEffect, useState } from "react";
import { useDebouncedValue } from "../../../../hooks";
import { useLocation } from "react-router-dom";
import './Search.css'
import searchIcon from "../../../../assets/search.svg"


export default function Search({ children, onSearch }) {
  const [query, setQuery] = useState("");
  const debounced = useDebouncedValue(query, 1000)
  const location = useLocation()
  console.log(location.pathname, location.pathname === "/movies")

  useEffect(() => {
    onSearch(debounced)  
  }, [debounced])

  return (
    <>
      <input className="search-input"
        type="text"
        placeholder={children}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={location.pathname !== "/movies"}
      />
      <img className="search-icon" src={searchIcon} alt="search-icon" />
    </>
  );
}
