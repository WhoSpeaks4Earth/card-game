

export const ActiveStatus = (props: {active: boolean, children: any}) => {

    return (
        <div className={props.active ? 'active' : ''}>
            {props.children}
        </div>
    )
}