const UserService={
    getUserName(knex){
        return knex.select('user_name').from('overlays_users')
        .where('id', id).first()
    }



}


export default UserService