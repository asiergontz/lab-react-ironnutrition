import './App.css';
import { Input, Button } from "antd";
import foodsJson from "./foods.json";
import FoodCard from './components/FoodCard';
import AddFoodForm from './components/AddFoodForm';
import { useState } from 'react';

function App() {
  const [foods, setFoods] = useState(foodsJson);
  const [searchTerm, setSearchTerm] = useState('');
  // we are going to use this state to show or hide the form
  const [showForm, setShowForm] = useState(false);

  return (
    <div className='app'>
      {
        // to show the form, we check if showForm is true with this conditional
        showForm && <AddFoodForm setFoods={setFoods} foods={foods} />
      }
      <Button style={{ marginTop: '30px' }} onClick={() => { setShowForm(!showForm) }}>
        {
          // we use this ternary operator to change the text of the button
          showForm ? 'Hide Form' : 'Show Form'
        }
      </Button>
      <Input
        style={{ width: '20vw', margin: '20px 0' }}
        type='text'
        placeholder='Search'
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '80vw',
          flexWrap: 'wrap',
          justifyContent: 'space-around'
        }}>
        {
          foods
            .filter((food) => { // filter the foods array to only show the foods that match the searchTerm
              if (searchTerm === '') {
                return true; // if the searchTerm is empty, return true for all foods
              } else {
                // and here we check if the food name includes the searchTerm
                return food.name.toLowerCase().includes(searchTerm.toLowerCase());
              }
            })
            .map((food, index) => {
              return (
                <FoodCard
                  food={food}
                  index={index}
                  key={index}
                  foods={foods}
                  setFoods={setFoods}
                />
              )
            })
        }
        {
          // if the foods array is empty, show a message
          foods.length === 0 && <p>No foods to display</p>
        }
      </div>
    </div>
  );
}

export default App;