import Realm from "realm";



export const USERS_SCHEMA ='users';

const UsersSchema = {
    name: USERS_SCHEMA,
    properties: {
        _id: "string",
        name: "string",
        email: "string?",
        photo: "string?",
    },
    primaryKey: "_id",
};

//realmConfig
 const realmConfig = {
    path:'app.realm',
    schema:[UsersSchema,],
    schemaVersion: 0 // use for migrate data
}

//-------->insertNewList
const insertNewList =(userList)=> new Promise((resolve, reject)=>{
    Realm.open(realmConfig)
        .then((realm)=>{
            realm.write(()=>{
                realm.create(USERS_SCHEMA, userList);
                resolve(userList);
            });
        })
        .catch((err)=>reject(err))
});

//-------->deleteAllList
const deleteAllList =()=> new Promise((resolve, reject)=>{
    Realm.open(realmConfig)
        .then((realm)=>{
            realm.write(()=>{
                let allTodolist = realm.objects(USERS_SCHEMA);
                realm.delete(allTodolist);
                resolve();
            });
        })
        .catch((err)=>reject(err))
});

//-------->queryAllList
const queryAllList =()=> new Promise((resolve, reject)=>{
    Realm.open(realmConfig)
        .then((realm)=>{
            realm.write(()=>{
                let allTodolist = realm.objects(USERS_SCHEMA);
                resolve(allTodolist);
            });
        })
        .catch((err)=>reject(err))
});


export {
    insertNewList,
    deleteAllList,
    queryAllList,
}

//-----
export default new Realm({realmConfig}); // realm object