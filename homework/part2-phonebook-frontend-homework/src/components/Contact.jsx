function Contact({ person, deletePerson }) {
    return (
        <li>
            <p>{person.name} - {person.phone} - {person.id} <button onClick={() => { deletePerson(person.id) }}>Deletar</button></p>
        </li>
    )
}

export default Contact