import Realm from 'realm'



//-------->
export const TODOLIST_SCHEMA = 'TodoList';
export const TODO_SCHEMA ='Todo';

// define models and properties
export const TodoSchema ={
    name: TODO_SCHEMA,
    primaryKey:'_id',
    properties:{
        id: 'int',
        name:{type: 'string', indexed: true},
        done: {type:'bool', default: false}
    }
}

export const TodolistSchema ={
    name: TODOLIST_SCHEMA,
    primaryKey: '_id',
    properties:{
        id: 'int',
        name: 'string',
        creationDate: 'date',
        todos: {type:'list', objectType: TODO_SCHEMA}
    }
}
//realmConfig
const realmConfig = {
    path:'sach123.realm',
    schema:[TodoSchema, TodolistSchema],
    schemaVersion: 0 // use for migrate data
}

//functions handle database

//-------->insertNewTodolist
const insertNewTodolist =(newTodolist)=> new Promise((resolve, reject)=>{
        Realm.open(realmConfig)
            .then((realm)=>{
                    realm.write(()=>{
                        realm.create(TODOLIST_SCHEMA, newTodolist);
                        resolve(newTodolist);
                    });
            })
            .catch((err)=>reject(err))
});

//-------->updateTodolist
const updateTodolist =(todolist)=> new Promise((resolve, reject)=>{
    Realm.open(realmConfig)
        .then((realm)=>{
            realm.write(()=>{
               let updateTodolist = realm.objectForPrimaryKey(TODOLIST_SCHEMA, todolist.id);
               updateTodolist.name = todolist.name;
               resolve();
            });
        })
        .catch((err)=>reject(err))
});

//-------->deleteTodolist
const deleteTodolist =(todolistId)=> new Promise((resolve, reject)=>{
    Realm.open(realmConfig)
        .then((realm)=>{
            realm.write(()=>{
                let deleteTodolist = realm.objectForPrimaryKey(TODOLIST_SCHEMA, todolistId);
                realm.delete(deleteTodolist);
                resolve();
            });
        })
        .catch((err)=>reject(err))
});


//-------->deleteAllTodolist
const deleteAllTodolist =()=> new Promise((resolve, reject)=>{
    Realm.open(realmConfig)
        .then((realm)=>{
            realm.write(()=>{
                let allTodolist = realm.objects(TODOLIST_SCHEMA);
                realm.delete(allTodolist);
                resolve();
            });
        })
        .catch((err)=>reject(err))
});

//-------->queryAllTodolist
const queryAllTodolist =()=> new Promise((resolve, reject)=>{
    Realm.open(realmConfig)
        .then((realm)=>{
            realm.write(()=>{
                let allTodolist = realm.objects(TODOLIST_SCHEMA);
                resolve(allTodolist);
            });
        })
        .catch((err)=>reject(err))
});


//-------Export
export {
    insertNewTodolist,
    updateTodolist,
    deleteTodolist,
    deleteAllTodolist,
    queryAllTodolist,
}

//-----
export default new Realm({realmConfig}); // realm object