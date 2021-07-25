/**
 * Alert Component
 * This component will handle different types of alert mechanism.
 */
const alertType = {
    'error' : 'alert-danger',
    'success' : 'alert-success',
}

function Alert (props) {
    return (
        <div className={`alert ${alertType[props.type]}`} role="alert">
            {props.message}
        </div>
    );
}

export default Alert;