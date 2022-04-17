import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

import db from "../../firebase/firebase-config";
import { getDoc, doc } from "firebase/firestore";

import "./Recipe.css";

const Recipe = () => {
    const { id: recipeId } = useParams();

    const [recipe, setRecipe] = useState(null);
    const [isPending, setPending] = useState(false);
    const [error, setError] = useState(null);

    const { mode } = useTheme();
    const recipeRef = doc(db, "recipes", recipeId);

    useEffect(() => {
        setPending(true);

        const fetchRecipe = async () => {
            const recipeDoc = await getDoc(recipeRef);
            if (recipeDoc.exists()) {
                setRecipe(r => ({ ...r, ...recipeDoc.data() }));
                setPending(false);
            } else {
                setError("Recipe doesnot exist.");
                setPending(false);
            }
        };
        fetchRecipe();
    }, []);

    return (
        <div>
            {error && <p className="error">{error}</p>}
            {isPending && <p className="loading">Loading Recipe....</p>}

            {recipe && (
                <div className={`recipe ${mode}`}>
                    <h2 className="page-title">{recipe.title}</h2>
                    <p>Takes {recipe.cookingTime} to cook this,</p>
                    <br />
                    <strong>Ingredients</strong>
                    <ul>
                        {recipe.ingredients.map(ing => (
                            <li key={ing}>{ing}</li>
                        ))}
                    </ul>
                    <p>{recipe.method}</p>
                </div>
            )}
        </div>
    );
};

export default Recipe;
