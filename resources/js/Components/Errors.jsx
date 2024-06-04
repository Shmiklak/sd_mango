export default function Errors({ errors, ...props }) {
    let arr = Object.values(errors);
    return arr.length > 0 ? (
        <div className="alert alert-danger" role="alert">
            { arr   .map((error) => (
                <div>{ error }</div>
            ))}
        </div>
    ) : <></>
}
