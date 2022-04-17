import "./RecipeList.css";

import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

import db from "../firebase/firebase-config";
import { doc, deleteDoc } from "firebase/firestore";

const RecipeList = ({ recipes }) => {
    const { mode } = useTheme();

    const deleteRecipe = async id => {
        const recipeRef = doc(db, "recipes", id);
        await deleteDoc(recipeRef);
    };

    return recipes.length > 0 ? (
        <div className="recipe-list">
            {recipes.map(recipe => (
                <div key={recipe.id} className={`card ${mode}`}>
                    <button
                        className="deleteButton"
                        onClick={() => deleteRecipe(recipe.id)}
                    >
                        🗑 Delete
                    </button>
                    <h3>{recipe.title}</h3>
                    <p>{recipe.cookingTime} to make this</p>
                    <br />
                    <div>{recipe.method.substring(0, 100)}...</div>
                    <Link to={`/recipes/${recipe.id}`}>🥘 Cook This</Link>
                </div>
            ))}
        </div>
    ) : (
        <div className="error">No recipes to show.</div>
    );
};

export default RecipeList;
