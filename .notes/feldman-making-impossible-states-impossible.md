# Making impossible states impossible 

- Should only be possible to run valid code. 
- Eksempel fra saga: rediger seddel, elns. 
- Have to write tests if impossible states are possible. 
- Think hard about the types/data model before you code. 
- Invalid states does not compile => less tests. Testing is good, impossible is better!
- A clearer data model can lead to a clearer api. 
- Example: survey app. Prompts and responses. 
    * { prompts: List String, responses: List (Maybe String) }
    * Should be impossible: { prompts = [], response = [Just "Yes"] }
- Exception catch: // should never happen
- Much better to find out about errors up front. 
- Question: prompt and response. 
- Question navigation: forward and back. 
- History: questions and current. 
- Impossible state: no questions, and current is pie. Zero questions should be impossible. 
- Fix with History: first, others and current. 
- Impossible state: current is something not in first or others. 
- Fix with ZipList: previous, current, remaining. 
- Let's add a status bar. 
- Add undo button to status bar. 
- { status: Maybe String, questionToRestore: Maybe Question } allows for { status = Nothing, questionToRestore = Just someQuestion }. 
- Replace the Maybes with a specific union type
  
    type Status = NoStatus | TextStatus String | DeletedStatus String Question

- Adding a Maybe creates twice as many possible states as before. Often not what we want. 
- Do we want two lists, or one with two fields per element. 
- Can we revise our implementation without breaking users' builds. 
- 
