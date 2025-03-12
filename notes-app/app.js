const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes.js");

yargs.version("1.1.0");

yargs.command({
  command: "add",
  describe: "adding a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

yargs.command({
  command: "remove",
  describe: "removing a note",
  builder: {
    title: {
      type: "string",
      demandOption: true,
      describe: "Note title",
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});

yargs.command({
  command: "list",
  describe: "listing all the notes",
  handler() {
    console.log("listing all the notes!");
    notes.listNotes();
  },
});

yargs.command({
  command: "read",
  describe: "Reading a note",
  builder: {
    title: {
      type: "String",
      demanOption: true,
      describe: "Note title",
    },
  },
  handler(argv) {
    notes.readNotes(argv.title);
  },
});
yargs.parse();
