const Models = require('../models')
const User = Models.User
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

module.exports = {
    viewAll: (req, res) => {
        User.findAll().then(userData => {
            res.status(200).json({message: 'user data found!', userData})
        }).catch(err => {
            res.status(500).json({message: 'internal server error', err})
        })
    },
    viewOne: (req, res) => {
        User.findById(req.params.id).then(data => {
            res.status(200).json({message: 'user data found!', data})
        }).catch(err => {
            res.status(500).json({message: 'internal server error', err})
        })
    },
    createUser: (req, res) => {
        let hash = bcrypt.hashSync(req.body.password, saltRounds);
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            role: req.body.role,
            createdAt: new Date(),
            updatedAt: new Date()
        }).then(data => {
            res.status(201).json({message: 'new user created!', data})
        }).catch(err => {
            res.status(500).json({message: 'internal server error', err})
        })
    },
    deleteUser: (req, res) => {
        User.destroy({where: {id: req.params.id}}).then(data => {
            res.status(200).json({message: 'user data deleted!' ,data})
        }).catch(err => {
            res.status(500).json({message: 'internal server error', err})
        })
    },
    editUser: (req, res) => {
        let hash = bcrypt.hashSync(req.body.password, saltRounds);
        User.update({
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            password: hash,
            role: req.body.role,
            updatedAt: new Date()
        }, {where: {id: req.params.id}}).then(data => {
            res.status(200).json({message: 'user data updated!', data})
        }).catch(err => {
            res.status(500).json({message: 'internal server error', err})
        })
    },
    signUp: (req, res) => {
        let hash = bcrypt.hashSync(req.body.password, saltRounds);
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            role: req.body.role
        }).then(data => {
            res.status(200).json({message: 'new user created!', data})
        }).catch((err) => {
            res.send(err)
        })
    },
    signIn: (req, res) => {
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                console.log(user);
                let success = bcrypt.compareSync(req.body.password, user.password)
                if (success) {
                    let token = jwt.sign({id: user.id, role: user.role}, 'iloveyou')
                    res.status(202).json({message: 'login success!', user, token})
                }else {
                    res.status(401).json({message: 'wrong password!'})
                }
            }else {
                res.status(404).json({message: 'email not found!'})
            }
        })
    }
}