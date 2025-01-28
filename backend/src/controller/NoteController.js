import Note from "../model/noteModel.js";


export const AddNote = async(req, res) => {
    try {
        const {title, content,tags} = req.body;
        const user = req.user

        if(!title || !content){
            return res.status(400).json({success:false, message:"Required Field"})
        }
         
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: user._id
        })

        await note.save()
           return res
             .status(200)
             .json({ success: true, message: "Note Created" ,data:note });
    } catch (error) {
          return res
            .status(400)
            .json({ success: false, message: "Failed To Create Note" });
    }
}

export const EditNote = async(req, res) => {
    try {
        const noteId = req.params.noteid
        const {title, content, tags, isPinned} = req.body;
        const user = req.user;

        if(!title && !content && !tags){
              return res
                .status(400)
                .json({ success: false, message: "No Changes Provided " });
        }

        const note = await Note.findById({_id:noteId, userId:user._id})
        if(!note){
             return res
               .status(400)
               .json({ success: false, message: "Note Not Found" });
        }

        if(title) note.title = title
        if(content) note.content = content
        if(tags) note.tags = tags
        if (isPinned) note.isPinned = isPinned;
        
        await note.save()

 return res
   .status(200)
   .json({ success: true, message: "Note Updated ",data:note });
        
    } catch (error) {
          return res
            .status(400)
            .json({ success: false, message: "Failed To update" });
    }
}

export const getAllNotes = async(req, res) => {
    try {
        const user = req.user;
        const notes = await Note.find({userId:user._id}).sort({isPinned : -1})
        res.status(200).json({ success: true, data:notes });
    } catch (error) {
        return res.status(400).json({ success: false, message: "Failed to fetch" });
    }
}

export const deleteNote = async(req, res) => {
    try {
        const noteId = req.params.noteid;
        const user = req.user

        const note = await Note.findOne({_id:noteId, userId:user._id})

        if(!note){
          res.status(400).json({ success: false, message:"Note Not Found" });
        }

        await Note.deleteOne({ _id: noteId, userId: user._id });
        
        res.status(200).json({ success: true, message:"Note Deleted" });
    } catch (error) {
         res.status(400).json({ success: false, message:"Failed TO Deleted" });
    }
}

export const updatePinned = async(req, res) => {
    try {
          const noteId = req.params.noteid;
          const { isPinned } = req.body;
          const user = req.user;
          
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
          return res.status(400).json({ success: false, message: "Note Not Found" });
        }
         note.isPinned = isPinned;

         await note.save();

      res.status(200).json({ success: true, data:note });
    } catch (error) {
         res.status(400).json({ success: false, message: "isPinned update Failed" });
    }
}

export const searchNote = async(req,res) => {
  try {
      const {query} = req.query
      const user = req.user

      if(!query){
        return res.status(400).json({message:"search query is required"})
      }

      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }
     
      const matchNote = await Note.find({
        userId: user._id,
        $or:[
          {title:{$regex: new RegExp(query, "i")}},
          {content:{$regex: new RegExp(query, "i")}}
        ]
      }).sort({isPinned: -1})

    res.status(200).json({success:true, data:matchNote})
  } catch (error) {
    res.status(500).json({success:false, message:"failed"})
  }
}