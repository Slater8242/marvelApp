import ErrorMessage from "../errorMessage/errorMessage";
import { Link } from "react-router-dom";

const Page404 =()=>{
    return(
        <div>
            <ErrorMessage/>
            <p>PAGE DOES NOT EXIST!!!</p>
            <Link to="/">GO BACK HOME PAGE</Link>
        </div>
    )
};

export default Page404;