const Note = require("../Model/notes");
const User = require("../Model/user");



exports.getNotes = (req, res, next) => {
    //  find the notes of the user
    User.findById(req.user.id).populate({ path: "notes", model: "Note" })
    .then(user => {
        res.render("notes", {notes: user.notes});
    })
    .catch(error => {
        console.log(error);
    });
}


exports.postNote = (req, res, next) => {
    const text = req.body.text;
    const date = req.body.date;
    const userId = req.user.id;


        const note = new Note({
            text: text,
            creator: userId,
            date: date
        });
        note.save(err => {
            if(err) {
                return res.json({ error: "Network Error", status: 500 })
            }
        });

        User.findById(userId).then(user => {
            if(!user) {
                return res.json({ error: "Not Authorized", status: 401 })
            }
            const updatedNotes = [...user.notes];
            updatedNotes.push(note._id);
            user.notes = updatedNotes;
            user.save(err => {
                if(err) {
                    return res.json({ error: "Network Error", status: 500 })
                }
                res.json({text: text, date: date, docId: note._id});
            });
        })
}


exports.deleteNote = (req, res, next) => {
    const noteId = req.query.id;
    const userId = req.user.id;

    if(!req.user) {
        return;
    }

    Note.findByIdAndDelete(noteId)
    .then(resp => {
        if(!resp) {
            return res.json({ error: "note not found..!", status: 401});
        }

        User.findById(userId).
        then(user => {
           if(!user) {
               return console.log("Not Authorized");
           }
           const notes = [...user.notes];
           const updatedNotes = notes.filter(id => id.toString() !== noteId.toString());
           user.notes = updatedNotes;
           user.save(err => {
               if(err) {
                   return console.log(err);
               }
           });
        })
        res.json({message: "note deleted", status: 200});
    })
    .catch(error => {
        console.log(error);
    });
}


exports.fullNote = (req, res, next) => {
    const noteId = req.query.id;

    Note.findById(noteId)
    .then(note => {
        if(!note) {
            return res.render("fullNote", {error: "note does'nt exsit"})
        }
        
        res.render("fullNote.ejs", {note: note});
    })
}