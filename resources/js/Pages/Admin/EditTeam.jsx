import App from "@/Layouts/App.jsx";

const EditTeam = ({ auth, members }) => {
    return (
        <div>
            <h1 className="section-title">Edit team</h1>
            <p>
                I will do this one day I swear. For now please ask me to update sd members
            </p>
        </div>
    )
}

EditTeam.layout = page => <App children={page}/>
export default EditTeam;
