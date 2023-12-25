import Sidebar from "./components/Sidebar"
import FinancialGraph from "./components/home-page/FinancialGraph";
import OverallStatus from "./components/home-page/OverallStatus"

const Homepage=()=>{
    const financialData = [
        { month: 'January', income: 1000, expense: 700, profit: 300 },
        { month: 'February', income: 1500, expense: 800, profit: 700 },
        { month: 'February', income: 1500, expense: 800, profit: 700 },
        { month: 'February', income: 1500, expense: 800, profit: 700 },
        { month: 'February', income: 1500, expense: 800, profit: 700 },
        { month: 'February', income: 1500, expense: 800, profit: 700 },
        { month: 'January', income: 1000, expense: 700, profit: 300 },
        { month: 'February', income: 1500, expense: 800, profit: 700 },
        { month: 'February', income: 1500, expense: 800, profit: 700 },
        { month: 'February', income: 1500, expense: 800, profit: 700 },
        { month: 'February', income: 1500, expense: 800, profit: 700 },
        { month: 'February', income: 1500, expense: 800, profit: 700 },
        // ... other months
    ];
    return(
        <div className="App">
            <aside>
                <Sidebar active={"home"}/>
            </aside>
            <section>
                <OverallStatus/>
                <FinancialGraph data={financialData}/>
            </section>
        </div>
    )
}

export default Homepage