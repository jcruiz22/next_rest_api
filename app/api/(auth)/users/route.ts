import connect from "@/lib/db";
import User from "@/lib/modals/user";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

const ObjectId = require("mongoose").Types.ObjectId;

export const GET = async () => {
  try {
    await connect();
    const users = await User.find({});
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new NextResponse("Error fetching users", { status: 500 });
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connect();
    const user = new User(body);
    await user.save();
    return new NextResponse(JSON.stringify(user), { status: 201 });
  } catch (error) {
    return new NextResponse("Error creating user", { status: 500 });
  }
}

export const PATCH = async (request: Request) => {
  try {
    const { userId, newUserName } = await request.json();
    await connect();

    if (!userId || !newUserName) {
      return new NextResponse("Missing userId", { status: 404 });
    }

    if (!Types.ObjectId.isValid(userId)) {
      return new NextResponse("Invalid user id", { status: 400 });
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { username: newUserName },
      { new: true }
    );

    if (!updatedUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(updatedUser), { status: 200 });

  } catch (error) {
    return new NextResponse("Error updating user", { status: 500 });
  }
};

export const DELETE = async (request: Request): Promise<NextResponse> => {
  try {
    const { userId } = await request.json();
    await connect();

    if (!userId) {
      return new NextResponse("User not found", { status: 404 });
    }

    if (!Types.ObjectId.isValid(userId)) {
      return new NextResponse("Invalid user id", { status: 400 });
    }

    const deletedUser = await User.findOneAndDelete({ _id: new ObjectId(userId) });

    if (!deletedUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(deletedUser), { status: 200 });

  } catch (error) {
    return new NextResponse("Error deleting user", { status: 500 });
  }
};