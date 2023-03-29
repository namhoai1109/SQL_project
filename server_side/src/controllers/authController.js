const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')
const path = require('path')

const config = require('../configs')
const { comparePassword } = require('../utils/passwordUtil')

exports.login = async (req, res) => {
  try {
    await prisma.$transaction(async (tx) => {
      const account = await tx.account.findUnique({
        where: {
          username: req.body.username
        }
      })
      // if account doesn't exist
      if (!account) {
        res.status(401).send({ message: 'Invalid username or password' })
      }

      // if password doesn't match
      const storedPassword = account.password
      const isMatch = await comparePassword(req.body.password, storedPassword)
      if (!isMatch) {
        res.status(401).send({ message: 'Invalid username or password' })
      }

      // if account is not confirmed
      if (!account.confirmed) {
        res.status(401).send(createReturnObject(null, '', 'Account is not confirmed', 401))
        return
      }

      // if account is inactive
      if (account.status === 'inactive') {
        res.status(401).send(createReturnObject(null, '', 'Account is inactive', 401))
        return
      }

      // if everything checks out
      console.log(config.jwtToken)
      const token = jwt.sign({ id: account.id }, config.jwtToken)
      res.status(200).send({
        token,
        username: account.username,
        role: account.role
      })
    })
  } catch (err) {
    console.log(err)
    res.status(401).send({ message: err.message })
  }
}

exports.validate = async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.confirmCode, config.jwtToken)
    const account = await prisma.account.findUnique({
      where: {
        id: decoded.id
      }
    })

    if (!account) {
      res.sendStatus(404)
      return
    }

    if (account.confirmed) {
      res.sendStatus(400)
      return
    }

    // update account
    await prisma.$transaction(async (prisma) => {
      await prisma.account.update({
        where: {
          id: account.id
        },
        data: {
          status: 'active',
          confirmed: true
        }
      })
    })

    res.status(200).send(createReturnObject(null, '', 'Account validated successfully', 200))

  } catch (err) {
    console.log(err)
    res.status(500).send(createReturnObject(null, err.message, 'Error validating account', 500))

  } finally {
    await prisma.$disconnect()
  }
}