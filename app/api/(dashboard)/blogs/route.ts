import connect from "@/lib/db";
import User from "@/lib/modals/user";
import Category from "@/lib/modals/category";
import Blog from "@/lib/modals/blog";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");
        const categoryId = searchParams.get("categoryId");

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

        const category = await Category.findById(categoryId);
        if (!category) {
            return new NextResponse("Category not found", { status: 404 });
        }

        const filter: any = { 
            category: new Types.ObjectId(categoryId),
            user: new Types.ObjectId(userId)
         };

        const blogs = await Blog.find(filter);
        return new NextResponse(JSON.stringify(blogs), { status: 200 });
    }
    catch (error: any) {
        return new NextResponse("Error fetching blogs", { status: 500 });
    };
}

