const {Router} = require('express');
const { 
    userGet,
    userPost,
    userPut,
    userdelete,
    userPatch 
} = require('../controller/user');

const router = Router();

    router.get('/', userGet);
    router.post('/', userPost);
    router.put('/:id', userPut);
    router.patch('/', userPatch);
    router.delete('/', userdelete);


module.exports = router