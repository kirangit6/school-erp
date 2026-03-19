import  connectDB  from "../../lib/mongodb";
import Student from "../../models/Student";

export async function GET() {
  console.log("API HIT");
  await connectDB();
  const students = await Student.find();
  console.log("students",students)
  return Response.json(students);
}

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.name || !body.grade || !body.contact) {
      return Response.json({ error: "All fields required" }, { status: 400 });
    }

    await connectDB();
    const student = await Student.create(body);

    return Response.json(student);
  } catch (error) {
    return Response.json({ error: "Failed to create" }, { status: 500 });
  }
}


// id routeModule.js
