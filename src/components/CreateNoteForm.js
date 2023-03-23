const CreateNoteForm = ({handleAddNote, newNote, handleChangeNote}) => {
  return (
    <>
      <form onSubmit={handleAddNote}>
        <input
        placeholder='Escriba el texto de la nota'
          type='text' 
          onChange={handleChangeNote} 
          value={newNote} 
        />
        <button>Crear nota</button>
      </form>
    </>
)}

export default CreateNoteForm