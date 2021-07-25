/**
 * Body component to add as a part in each page component.
 */
import './Body.scss';

function Body (props) {
    return (
        <div className={`container-fluid h-90 bodyContainer ${props.className}`}>
            <div className={`row ${props.rowClassName}`}>
                {props.children}
            </div>
        </div>
    );
}

export default Body;