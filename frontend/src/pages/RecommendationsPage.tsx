import Recommendations from "../components/RecommenderTest";
import ShowRecommender from "../components/ShowRecommender";


function RecommendationsPage() {

    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const email = user.email;
    const role = user.role
    return (
        <>
<p>this is your email {email}</p>
<p>this is your role {role}</p>

    <Recommendations userEmail={email} />

    <br />
    <br />
    <ShowRecommender />
        </>
        
    )
}

export default RecommendationsPage;