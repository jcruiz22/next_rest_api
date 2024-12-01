import connect from "@/lib/db";
import User from "@/lib/modals/user";
import Category from "@/lib/modals/category";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export const PATCH = async (request: Request, context: { params: any }) => {
    const { category } = await context.params;
    const categoryId = category;
    try {
        const { title } = await request.json();

        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse("Missing userId", { status: 400 });
        }

        if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
            return new NextResponse("Missing categoryId", { status: 400 });
        }
        await connect();

        const user = await User.findById(userId);
        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        const userCategory = await Category.findOne({ _id: categoryId, user: userId });
        if (!userCategory) {
            return new NextResponse("Category not found", { status: 404 });
        }

        const updatedCategory = await Category.findByIdAndUpdate(categoryId, { name: title }, { new: true });
        return new NextResponse(JSON.stringify(updatedCategory), { status: 200 });

    } catch (error: any) {
        return new NextResponse("Error updating category", { status: 500 });
    };
}

export const DELETE = async (request: Request, context: { params: any }) => {
    const categoryId = context.params.category;

    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse("Missing userId", { status: 400 });
        }

        if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
            return new NextResponse("Missing categoryId", { status: 400 });
        }
        await connect();

        const user = await User.findById(userId);
        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }
        
        const userCategory = await Category.findOne({ _id: categoryId, user: userId });
        if (!userCategory) {
            return new NextResponse("Category not found or does not belong to this user id", { status: 404 });
        }

        await Category.findByIdAndDelete(categoryId);
        return new NextResponse("Category deleted successfully", { status: 200 });
    } catch (error: any) {
        return new NextResponse("Error in deleting the category", { status: 400 });
    }
}