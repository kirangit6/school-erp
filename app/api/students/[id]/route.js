import  connectDB  from "../../../lib/mongodb";
import Student from "../../../models/Student";
import mongoose from "mongoose";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params; 

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json({ error: "Invalid ID" }, { status: 400 });
    }

    const student = await Student.findById(id); 

    console.log("DB RESULT:", student);

    if (!student) {
      return Response.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    return Response.json(student);
  } catch (error) {
    console.error("ERROR:", error);
    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return Response.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }

    return Response.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { id } = await params; // ✅ important

    const body = await req.json(); // ✅ important
    console.log("UPDATE BODY:", body);

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      body,
      {
        new: true,        // ✅ updated data return करेगा
        runValidators: true,
      }
    );

    if (!updatedStudent) {
      return Response.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }

    return Response.json({
      message: "Updated successfully",
      data: updatedStudent,
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Update failed" },
      { status: 500 }
    );
  }
}


