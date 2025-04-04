import { useEffect,useState } from "react";
import './CategoryFilter.css';
function CategoryFilter({selectedCategories, onCheckboxChange}: 
    {
        selectedCategories: string[];
        onCheckboxChange: (categories:string[]) => void;
})
{
    const [categories,setCategories]=useState<string[]>([]);
    
    useEffect(()=> {
        const fetchCategories = async () => {
            try {
            const response = await fetch("https://mission13backendwilson.azurewebsites.net/Books/GetCategories");
            

            const data = await response.json();
            console.log('Fetched categories ', data)
            setCategories(data);
            }
            catch(error){
                console.error('Error fetching categories ', error)
            }
        };

        fetchCategories();
    }, []
    )

    function handleCheckboxChange ({target}: {target: HTMLInputElement}){
        const updatedCategories = selectedCategories.includes(target.value) ? selectedCategories.filter(c => c !== target.value) : [...selectedCategories, target.value];

        onCheckboxChange(updatedCategories);
    }


    return(
        <>
        <div className='category-filter'>
            <h5>Categories</h5>
            <div className="category-list">
                {categories.map((c) => (
                    <div className="category-item" key={c}> 
                        <input 
                        type="checkbox" 
                        id={c} value={c} 
                        className="category-checkbox"
                        onChange={handleCheckboxChange} />
                        <label htmlFor={c}>{c}</label>

                    </div>
                ))}
            </div>
        </div>
        </>
    );
    
}

export default CategoryFilter;