/**
 * Input Component
 * Handles different input types.
 */
import './Input.scss'

function Input (props) {

    if (props.type === 'radio') {
        return (
            <>
                <input 
                    type={props.type} 
                    value={props.value || ""} 
                    name={props.name} 
                    onChange={props.onChange} 
                    className={`${props.className}`} 
                    placeholder={props.placeholder}
                    id={props.id}
                    checked={props.checked}
                />
                <label className={`${props.labelClassName}`} htmlFor={props.labelFor}>{props.label}</label>
            </>
        );
    } else if (props.type === 'textarea') {
        return (
            <>
                <label className={`${props.labelClassName}`}><b>{props.label}</b></label>
                <textarea 
                    type={props.type} 
                    rows={props.rows} 
                    value={props.value || ""} 
                    name={props.name} 
                    onChange={props.onChange} 
                    className={`${props.className}`} 
                    placeholder={props.placeholder}
                >
                </textarea>
            </>
        );
    } else {
        return (
            <>
                <label className={`${props.labelClassName}`}><b>{props.label}</b></label>
                <input 
                    type={props.type} 
                    value={props.value || ""} 
                    name={props.name} 
                    onChange={props.onChange} 
                    className={`${props.className}`} 
                    placeholder={props.placeholder}
                />
            </>
        );
    }
}

export default Input;