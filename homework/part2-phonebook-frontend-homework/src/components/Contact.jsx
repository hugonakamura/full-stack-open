function Contact({ contact, deleteContact }) {
    return (
        <li>
            <p>{contact.name} - {contact.phone} - {contact.id} <button onClick={() => { deleteContact(contact.id) }}>Deletar</button></p>
        </li>
    )
}

export default Contact