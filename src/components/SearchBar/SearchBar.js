import React from 'react';
import './SearchBar.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch
} from "@fortawesome/free-solid-svg-icons";
import './SearchBar.css'
import { useHistory } from 'react-router-dom'

function SearchBar(props) {
    const history = useHistory();
    return (
        <div className="searchBar" onClick={() => { history.push("/searching") }}>
            <input value={props.value} onChange={props.onChange} className="searchTerm" type="text" placeholder="Tìm kiếm sản phẩm...."/>
            <button className="searchButton" ><FontAwesomeIcon icon={faSearch} /></button>
        </div>
    )
}

export default SearchBar;