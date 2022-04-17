import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import db from "../../firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useCollection } from "../../hooks/useCollection";
//styles
import "./Home.css";

//update for main branch deploy on firebase
//components
import RecipeList from "../../components/RecipeList";

const Home = () => {
    //const [data, setData] = useState(null);
    const [isPending, setPending] = useState(false);
    const [error, setError] = useState(null);

    // const recipesCollectionRef = collection(db, "recipes");

    //Realtime Collection
    const { document: recipes } = useCollection("recipes");

    // useEffect(() => {
    //     setPending(true);

    //     const fetchRecipes = async () => {
    //         const recipeCollection = await getDocs(recipesCollectionRef);
    //         if (recipeCollection.empty) {
    //             setError("No recipes to load");
    //             setPending(false);
    //         } else {
    //             let results = [];
    //             recipeCollection.docs.map(recipeDoc =>
    //                 results.push({ ...recipeDoc.data(), id: recipeDoc.id })
    //             );
    //             setData(results);
    //             setPending(false);
    //         }
    //     };

    //     fetchRecipes();
    // }, []);

    return (
        <div>
            {error && <p className="error">{error}</p>}
            {isPending && <p className="loading">Loading Recipes....</p>}
            {recipes && <RecipeList recipes={recipes} />}
        </div>
    );
};

export default Home;
