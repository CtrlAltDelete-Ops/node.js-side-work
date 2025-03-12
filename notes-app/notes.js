const chalk = require('chalk');
const fs = require('fs')

const addNote = (title, body) => {
    const notes = loadfiles();
    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNote(notes);
        console.log(chalk.green.inverse('New note added!'));
    } else {
        console.log(chalk.red.inverse('Title already exists!'));
    }

}

const saveNote = (notes) => {
    const note = JSON.stringify(notes);
    fs.writeFileSync('notes.json', note);
}

const loadfiles = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const stringData = dataBuffer.toString();
        return JSON.parse(stringData);
    } catch (error) {
        return [];
    }
}  

const removeNote = (title) => {
    const notes = loadfiles();
    const updatedNotes = notes.filter((note) => {
        return note.title !== title;})
    if (updatedNotes.length !== notes.length){
        saveNote(updatedNotes);
        console.log(chalk.green('The note has been successfully removed'));
    } else {
        console.log(chalk.red("The title you are looking for doesn't exist!"));
    }}

const listNotes = () => {
    const notes = loadfiles();
    console.log(chalk.inverse("Your Notes:"));
    notes.forEach((note) => {
        console.log(chalk.italic.blue(`Title: ${note.title}`));
    })
}

const readNotes = (title) => {
    const notes = loadfiles();
    const note = notes.find((note) => note.title === title);
    if (note) {
        console.log(chalk.blue.italic(note.title) + ` => ${note.body}`);
    } else {
        console.log(chalk.red(`Note "${title}" doesn't exist"`));
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}