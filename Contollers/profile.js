const handleProfile = (db) => (req, res) => {
    const { id } = req.params;
    let found = false;
    db.select('*').from('users').where({ id: id })
      .then(user => {
        if(user.length){
            res.json(user[0]);
        } else {
            res.status(400).json('Not Found')
        }
        
    })
    .catch(err => res.status(400).json('Error getting user'))
}

module.exports = {
    handleProfile: handleProfile
}