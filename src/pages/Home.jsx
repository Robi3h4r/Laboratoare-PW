import { useEffect, useState } from "react";

function Home() {
 
const [stats, setStats] = useState(null);
    
    useEffect(function(){
        fetch('http://localhost:3000/api/stats')
    .then()
    })
 
    return (
 <div>
 <h2>Home</h2>
 <p>Bine ai venit pe dashboard-ul meu!</p>
 </div>
 );
}
export default Home;
