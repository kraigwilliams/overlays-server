const GroupsService={
    getAllGroups(knex){
    return knex.select('*').from('user_options')
}
,

insertGroup(knex, newGroup){
return knex
.insert(newGroup)
.into('user_options')
.returning("*")
},

getById(knex,id){
    return knex.from('user_options').select("*").where('id', id).first()
},

deleteGroup(knex,id){
    return knex('user_options')
    .where({id})
    .delete()
},
updateGroup(knex,id, newGroupFields){
    return knex('user_options')
    .where({id})
    .update(newGroupFields)
}
}

module.exports= GroupsService;