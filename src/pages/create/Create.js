import { addDoc, collection } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import db from "../../firebase/firebase-config";
import "./Create.css";

const Create = () => {
    const [title, setTitle] = useState("");
    const [method, setMethod] = useState("");
    const [cookingTime, setCookingTime] = useState("");
    const [newIngredient, setNewIngredient] = useState("");
    const [ingredients, setIngredients] = useState([]);

    const [isPending, setPending] = useState(false);
    const [error, setError] = useState(null);

    const ingredientInput = useRef(null);
    const recipeCollectionRef = collection(db, "recipes");

    const history = useHistory();

    const createRecipe = async e => {
        e.preventDefault();
        setPending(true);
        await addDoc(recipeCollectionRef, {
            title,
            ingredients,
            method,
            cookingTime: cookingTime + " minutes",
        });
        setTitle("");
        setIngredients([]);
        setMethod("");
        setCookingTime("");
        setPending(false);
        history.push("/");
    };

    const handleAdd = e => {
        e.preventDefault();
        const ingredient = newIngredient.trim();
        if (ingredient && !ingredients.includes(ingredient)) {
            setIngredients(curIng => [...curIng, ingredient]);
            setNewIngredient("");
            ingredientInput.current.focus();
        } else {
            alert("Ingredient exists.");
        }
    };

    return (
        <div className="create">
            {error && <p className="error">{error}</p>}
            {isPending && <p className="loading">Saving Recipe....</p>}
            <h2 className="page-title">Add a New Recipe</h2>
            <form onSubmit={createRecipe}>
                <label>
                    <span>Recipe title:</span>
                    <input
                        type="text"
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                        required
                    />
                </label>

                <label>
                    <span>Recipe Ingredients:</span>
                    <div className="ingredients">
                        <input
                            type="text"
                            onChange={e => setNewIngredient(e.target.value)}
                            value={newIngredient}
                            ref={ingredientInput}
                        />
                        <button onClick={handleAdd} className="btn">
                            add
                        </button>
                    </div>
                </label>
                <p>
                    Current ingredients:{" "}
                    {ingredients &&
                        ingredients.map(i => <em key={i}>{i}, </em>)}
                </p>

                <label>
                    <span>Recipe Method:</span>
                    <textarea
                        onChange={e => setMethod(e.target.value)}
                        value={method}
                        required
                    />
                </label>

                <label>
                    <span>Cooking time (minutes):</span>
                    <input
                        type="number"
                        onChange={e => setCookingTime(e.target.value)}
                        value={cookingTime}
                        required
                    />
                </label>

                <button className="btn">submit</button>
            </form>
        </div>
    );
};

export default Create;
