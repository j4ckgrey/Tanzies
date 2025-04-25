export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld && "#59E391"
    }
    return (
        <button 
        onClick={props.hold}
        aria-label={`Die with value ${props.value}, ${props.isHeld} ? "Held" : "Not Held"`}
        style={styles}>
            {props.value}
        </button>
    )
}