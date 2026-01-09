// ==========================================
// MANY-TO-MANY RELATIONSHIP
// ==========================================

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function manyToMany() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB\n");

    const db = client.db("learn_db");
    const students = db.collection("students");
    const courses = db.collection("courses");
    const enrollments = db.collection("enrollments");

    await students.deleteMany({});
    await courses.deleteMany({});
    await enrollments.deleteMany({});

    // Insert Students
    console.log("=== INSERT STUDENTS ===");
    const studentDocs = await students.insertMany([
      { name: "Alice", grade: "A", email: "alice@school.com" },
      { name: "Bob", grade: "B", email: "bob@school.com" },
      { name: "Charlie", grade: "A", email: "charlie@school.com" }
    ]);

    const aliceId = studentDocs.insertedIds[0];
    const bobId = studentDocs.insertedIds[1];
    const charlieId = studentDocs.insertedIds[2];

    console.log("✅ Inserted 3 students");

    // Insert Courses
    console.log("\n=== INSERT COURSES ===");
    const courseDocs = await courses.insertMany([
      { name: "Math 101", credits: 3, instructor: "Prof. Johnson" },
      { name: "English 201", credits: 4, instructor: "Prof. Smith" },
      { name: "Physics 301", credits: 5, instructor: "Prof. Brown" }
    ]);

    const mathId = courseDocs.insertedIds[0];
    const englishId = courseDocs.insertedIds[1];
    const physicsId = courseDocs.insertedIds[2];

    console.log("✅ Inserted 3 courses");

    // Create Enrollments (Junction Collection)
    console.log("\n=== CREATE ENROLLMENTS ===");
    await enrollments.insertMany([
      { studentId: aliceId, courseId: mathId, enrollDate: new Date("2024-01-01"), status: "active" },
      { studentId: aliceId, courseId: englishId, enrollDate: new Date("2024-01-01"), status: "active" },
      { studentId: bobId, courseId: mathId, enrollDate: new Date("2024-01-02"), status: "active" },
      { studentId: bobId, courseId: physicsId, enrollDate: new Date("2024-01-02"), status: "active" },
      { studentId: charlieId, courseId: englishId, enrollDate: new Date("2024-01-03"), status: "active" },
      { studentId: charlieId, courseId: physicsId, enrollDate: new Date("2024-01-03"), status: "completed" }
    ]);

    console.log("✅ Created enrollments");

    // Get Student's Courses
    console.log("\n=== ALICE'S COURSES ===");
    const aliceEnrollments = await enrollments.find({ studentId: aliceId }).toArray();
    
    for (const enrollment of aliceEnrollments) {
      const course = await courses.findOne({ _id: enrollment.courseId });
      console.log(`- ${course.name} (${course.credits} credits)`);
    }

    // Get Course's Students
    console.log("\n=== MATH 101 STUDENTS ===");
    const mathEnrollments = await enrollments.find({ courseId: mathId }).toArray();
    
    for (const enrollment of mathEnrollments) {
      const student = await students.findOne({ _id: enrollment.studentId });
      console.log(`- ${student.name} (Grade: ${student.grade})`);
    }

    // Count Enrollments
    console.log("\n=== ENROLLMENT COUNTS ===");
    const allStudents = await students.find({}).toArray();
    
    for (const student of allStudents) {
      const count = await enrollments.countDocuments({ studentId: student._id });
      console.log(`${student.name}: ${count} courses`);
    }

    // Most Popular Course
    console.log("\n=== MOST POPULAR COURSE ===");
    const courseCounts = await enrollments.aggregate([
      {
        $group: {
          _id: "$courseId",
          studentCount: { $sum: 1 }
        }
      },
      { $sort: { studentCount: -1 } },
      { $limit: 1 }
    ]).toArray();

    const popularCourse = await courses.findOne({ _id: courseCounts[0]._id });
    console.log(`${popularCourse.name}: ${courseCounts[0].studentCount} students`);

    // Using $lookup for JOIN
    console.log("\n=== USING $lookup ===");
    const studentCourses = await enrollments.aggregate([
      { $match: { studentId: aliceId } },
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "courseInfo"
        }
      },
      { $unwind: "$courseInfo" },
      {
        $project: {
          courseName: "$courseInfo.name",
          credits: "$courseInfo.credits",
          status: 1,
          _id: 0
        }
      }
    ]).toArray();

    console.log("Alice's courses (via $lookup):");
    console.log(studentCourses);

    console.log("\n✅ Many-to-Many Complete!");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.close();
  }
}

manyToMany();
