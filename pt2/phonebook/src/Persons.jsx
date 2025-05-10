const Persons = (props) => {
    return (
        <div>
            {props.persons.map((p) => <p key={p.name}>{p.name} {p.number} <button onClick={() => props.deletePerson(p.id)}>delete</button></p>)}
        </div>
    )
}

export default Persons