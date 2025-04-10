import Recommendations from "../components/RecommenderTest";


function RecommendationsPage() {

    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const email = user.email;
    return (
        <>
<p>this is your email {email}</p>
    <Recommendations userEmail={email} />
        </>
        
    )
}

export default RecommendationsPage;