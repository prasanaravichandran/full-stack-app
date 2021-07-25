/**
 * Card Component
 * Customizable component throught the application.
 */
function Card (props) {
    return (
        <div className={`card ${props.cardStyle}`}>
            <div className="card-body">
                {props.title && <h5 className="card-title">{props.title}</h5>}
                {props.children}
            </div>
        </div>
    );
}

export default Card;