import { PrismaD1 } from "@prisma/adapter-d1"
import { PrismaClient } from "@prisma/client"
import { sign } from "hono/jwt"

export const usernameDetails = async (c: any) => {
  const adapter = new PrismaD1(c.env.DB)
  const prisma = new PrismaClient({ adapter })
  const decodedPayload = c.get("decodedPayload")

  const username = c.req.param("username")

  const user = await prisma.user.findUnique({
    where: { username: username },
  })

  const selectFields = {
    name: true,
    email: true,
    image: true,
    username: true,
  }

  if (decodedPayload?.id === user?.id) {
    selectFields.collection = {}
  } else {
    selectFields.collection = {
      where: {
        isPublic: true,
      },
    }
  }

  const findUser = await prisma.user.findUnique({
    where: {
      username: username,
    },
    select: selectFields,
  })

  if (!findUser) {
    return c.json({ success: false, message: "User does not exist" }, 404)
  }

  return c.json({ success: true, data: findUser }, 200)
}

export const userDetails = async (c: any) => {
  const adapter = new PrismaD1(c.env.DB)
  const prisma = new PrismaClient({ adapter })
  const decodedPayload = c.get("decodedPayload")

  const user = await prisma.user.findUnique({
    where: {
      id: decodedPayload?.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      image: true,
      collection: true,
    },
  })

  if (user) {
    return c.json(
      {
        success: true,
        data: user,
        message: "User details fetched successfully",
      },
      201
    )
  }
}

export const createUpdateUser = async (c: any) => {
  const adapter = new PrismaD1(c.env.DB)
  const prisma = new PrismaClient({ adapter })

  const { name, email, image } = await c.req.json()

  const findUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })

  if (findUser) {
    const payload = {
      id: findUser?.id,
      name,
      email,
      image,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365,
    }
    const accessToken = await sign(payload, c.env.AUTH_SECRET)

    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        accessToken: accessToken,
      },
    })
    return c.json(
      { success: true, accessToken, message: "User updated successfully" },
      200
    )
  } else {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        image,
      },
    })

    const payload = {
      id: user?.id,
      name,
      email,
      image,
    }

    const accessToken = await sign(payload, c.env.AUTH_SECRET)
    return c.json(
      { success: true, accessToken, message: "User created successfully" },
      200
    )
  }
}

export const checkUsername = async (c: any) => {
  const adapter = new PrismaD1(c.env.DB)
  const prisma = new PrismaClient({ adapter })

  const query = c.req.query("u")

  if (!/^[a-zA-Z0-9]+$/.test(query)) {
    return c.json(
      {
        success: false,
        message: "Username should only contain letters and numbers",
      },
      200
    )
  }

  const findUser = await prisma.user.findUnique({
    where: {
      username: query,
    },
  })

  if (findUser) {
    return c.json({ success: false, message: `${query} not available` }, 409)
  }

  return c.json({ success: true, message: `${query} is available` }, 201)
}

export const createUsername = async (c: any) => {
  const adapter = new PrismaD1(c.env.DB)
  const prisma = new PrismaClient({ adapter })
  const decodedPayload = c.get("decodedPayload")

  const { username } = await c.req.json()

  const findUser = await prisma.user.findUnique({
    where: {
      username: username,
    },
  })

  if (findUser) {
    if (findUser?.id === decodedPayload?.id) {
      return c.json(
        { success: false, message: "You already own this username" },
        201
      )
    } else {
      return c.json(
        {
          success: false,
          message: "Username already exists. Please try a new one",
        },
        201
      )
    }
  }

  await prisma.user.update({
    where: {
      id: decodedPayload?.id,
    },
    data: {
      username: username,
    },
  })

  return c.json(
    { success: true, message: "Username updated successfully" },
    201
  )
}
