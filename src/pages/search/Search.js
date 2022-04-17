import React from "react";
import { useLocation } from "react-router-dom";
import RecipeList from "../../components/RecipeList";
import { useFetch } from "../../hooks/useFetch";

// styles
import "./Search.css";

const Search = () => {
    const queryString = useLocation().search;
    const queryParams = new URLSearchParams(queryString);
    const query = queryParams.get("q");

    const { error, data, isPending } = useFetch(
        `http://localhost:3000/recipes?q=${query}`
    );

    return (
        <div>
            <h2 className="page-title">Recipes including "{query}"</h2>
            {error && <p className="error">{error}</p>}
            {isPending && <p className="loading">Loading Recipes....</p>}
            {data && <RecipeList recipes={data} />}
        </div>
    );
};

export default Search;
