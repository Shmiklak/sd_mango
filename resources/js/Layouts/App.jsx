import {router, usePage} from "@inertiajs/react";
import {useState} from "react";
import PageHeader from "@/Components/PageHeader.jsx";

const App = ({children}) => {
    const { auth } = usePage().props;
    const [transitioning, setTransitioning] = useState(false)
    router.on('start', () => {
        setTransitioning(true)
    })

    router.on('finish', () => {
        setTransitioning(false)
    })
    return (
        <div className="App">
            <PageHeader auth={auth}/>
            <main className={transitioning ? "router-animation on" : "router-animation"}>
                <div className="container">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default App;
