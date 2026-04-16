import React from 'react';
import FoodCard from './FoodCard';

// 1. Food Array (add you new food details here)
const menuData = [
    {
        id: 1,
        name: "Special Veg Thali",
        price: 120,
        img: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=500"
    },
    {
        id: 2,
        name: "Paneer Tikka",
        price: 150,
        img: "https://images.pexels.com/photos/3928854/pexels-photo-3928854.png?auto=compress&cs=tinysrgb&w=500"
    },
    {
        id: 3,
        name: "Samosa (2pc)",
        price: 30,
        img: "https://images.pexels.com/photos/4449068/pexels-photo-4449068.jpeg?auto=compress&cs=tinysrgb&w=500"
    },
    {
        id: 4,
        name: "Chicken Biryani",
        price: 200,
        img: "https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg?auto=compress&cs=tinysrgb&w=500"
    },
    {
        id: 5,
        name: "Gulab Jamun",
        price: 40,
        img: "https://as2.ftcdn.net/v2/jpg/08/94/76/25/1000_F_894762571_KXz2mTpbcjHRGMg48iiU4CnI9v7La4EN.jpg?w=500"
    },
    {
        id: 6,
        name: "Masala Dosa",
        price: 90,
        img: "https://img.freepik.com/premium-photo/traditional-kerala-masala-dosa-south-indian-food-masala-dosa-picture-photography_1020697-134313.jpg?w=500"
    }
];

function Home() {
    const user = localStorage.getItem('userName') || "Dost";

    return (
        <div className="home-container">
            {/* Hero Section */}
            <header className="hero-section">
                <h1 className="hero-title">Welcome, <span className="highlight">{user}!</span></h1>
                <p className="hero-subtitle">Ghar jaisa swad, ab Lucknow ke har gaon mein!</p>
            </header>

            {/* Food Grid */}
            <div className="food-grid">
                {menuData.map((food) => (
                    <FoodCard key={food.id} item={food} />
                ))}
            </div>
        </div>
    );
}

export default Home;