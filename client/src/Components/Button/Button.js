/**
 * Button Component
 * This component will handle different types of button.
 */
function Button (props) {
    return (
        <button 
            onClick={props.onClick} 
            type={props.type} 
            className={`btn ${props.className}`}
            value={props.value}
            id={props.id}
        >
            { props.loading && <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>}
            {props.name}
        </button>
    );
}

export default Button;