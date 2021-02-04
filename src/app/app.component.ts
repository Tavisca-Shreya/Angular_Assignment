import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NoteDialogComponent } from './note-dialog/note-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ideaboard-ng';

  topics:Array<Topic> | undefined;
  count:number = 0;
  noteCount:number = 0;

  constructor(public dialog: MatDialog) {
    this.InitializeObject();
  }

  InitializeObject = () =>{
    if(!this.topics){
      this.topics = new Array<Topic>();
    }
    let topics = this.topics;
    topics.push({
      title: "Title 1",
      notes: []
    });
    topics.push({
      title: "Title 2",
      notes: []
    });
    topics.push({
      title: "Title 3",
      notes: []
    });
    

  }

  addNote = (topic: Topic) =>{    
    const dialogRef = this.dialog.open(NoteDialogComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.trim() != '') {
        topic.notes.push({text: result, id: Math.ceil(Math.random()*99999999)});
      }      
    });
    
    
  }

  deleteNote(id:number, topic:Topic) {
    var idx = 0;
    for(var i=0;i<topic.notes.length; ++i) {
      if(topic.notes[i].id===id) {
        idx = i;
        break;
      }
    }
    topic.notes.splice(idx,1);

  }

}
export interface Topic {
    title: String,
    notes: Array<Note>
}

export interface Note {
  text: String;
  id:number;
}
