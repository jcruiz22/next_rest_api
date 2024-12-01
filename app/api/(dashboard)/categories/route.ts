import connect from "@/lib/db";
import User from "@/lib/modals/user";
import Category from "@/lib/modals/category";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

const ObjectId = require("mongoose").Types.ObjectId;

export const GET = async (request: Request) => {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse("Missing userId", { status: 400 });
        }

        await connect();

        const user = await User.findById(userId);
        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        const categories = await Category.find({ user: new Types.ObjectId(userId) });

        return new NextResponse(JSON.stringify(categories), { status: 200 });

    } catch (error: any) {
        return new NextResponse("Error fetching categories", { status: 500 });
    };
}

export const POST = async (request: Request) => {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");
        const { title } = await request.json();

        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse("Missing userId", { status: 404 });
        }
        await connect();

        const user = await User.findById(userId);
        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        const newCategory = new Category({
            name: title,
            user: new Types.ObjectId(userId)
        });

        await newCategory.save();

        return new NextResponse(JSON.stringify(newCategory), { status: 201 });

    } catch (error: any) {
        return new NextResponse("Error creating category", { status: 500 });
    }
}