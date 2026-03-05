import "dotenv/config";
import { createClient, type User } from "@supabase/supabase-js";

type Role = "student" | "teacher" | "admin";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
}

if (process.env.NODE_ENV === "production") {
  throw new Error("Seeding is blocked in production");
}

const admin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
function requireEnv(...names: string[]) {
  for (const name of names) {
    const value = process.env[name];
    if (value && value.trim()) return value;
  }
  throw new Error(`Missing env var: ${names.join(" or ")}`);
}

const seed = {
    
  teacherEmail:
    process.env.SEED_TEACHER_EMAIL ??
    process.env.E2E_TEACHER_EMAIL ??
    "teacher@example.com",
  teacherPassword: requireEnv("SEED_TEACHER_PASSWORD", "E2E_TEACHER_PASSWORD"),

  studentEmail:
    process.env.SEED_STUDENT_EMAIL ??
    process.env.E2E_STUDENT_EMAIL ??
    "student@example.com",
    studentPassword: requireEnv("SEED_STUDENT_PASSWORD", "E2E_STUDENT_PASSWORD"),

  adminEmail:
    process.env.SEED_ADMIN_EMAIL ??
    process.env.E2E_ADMIN_EMAIL ??
    "admin@example.com",
      adminPassword: requireEnv("SEED_ADMIN_PASSWORD", "E2E_ADMIN_PASSWORD"),

};

function must<T>(value: T | null | undefined, message: string): T {
  if (value == null) throw new Error(message);
  return value;
}

async function listAllUsers(): Promise<User[]> {
  const users: User[] = [];
  let page = 1;

  while (true) {
    const { data, error } = await admin.auth.admin.listUsers({
      page,
      perPage: 1000,
    });
    if (error) throw new Error(`[auth.listUsers] ${error.message}`);

    users.push(...(data.users ?? []));
    if ((data.users ?? []).length < 1000) break;
    page += 1;
  }

  return users;
}

async function upsertAuthUser(
  email: string,
  password: string,
  role: Role,
  fullName: string,
) {
  const users = await listAllUsers();
  const existing = users.find(
    (u) => u.email?.toLowerCase() === email.toLowerCase(),
  );

  if (existing) {
    const { error } = await admin.auth.admin.updateUserById(existing.id, {
      password,
      email_confirm: true,
      app_metadata: { ...(existing.app_metadata ?? {}), role },
      user_metadata: { ...(existing.user_metadata ?? {}), full_name: fullName },
    });
    if (error) throw new Error(`[auth.updateUserById:${email}] ${error.message}`);
    return existing.id;
  }

  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    app_metadata: { role },
    user_metadata: { full_name: fullName },
  });

  if (error) throw new Error(`[auth.createUser:${email}] ${error.message}`);
  return must(data.user?.id, `[auth.createUser:${email}] missing user id`);
}

async function seedRelationalData() {
  const teacherId = "teacher-seed-1";
  const studentId = "student-seed-1";
  const domainId = "domain-seed-math";
  const subDomainId = "subdomain-seed-algebra";

  let res = await admin.from("Teacher").upsert(
    {
      tchr_id: teacherId,
      tchr_name: "John",
      tchr_lastname: "Doe",
      tchr_email: seed.teacherEmail,
    
    },
    { onConflict: "tchr_email" },
  );
  if (res.error) throw new Error(`[Teacher.upsert] ${res.error.message}`);

  res = await admin.from("Student").upsert(
    {
      std_id: studentId,
      std_name: "Jane",
      std_lastname: "Smith",
      std_email: seed.studentEmail,

    },
    { onConflict: "std_email" },
  );
  if (res.error) throw new Error(`[Student.upsert] ${res.error.message}`);

  res = await admin.from("Domain").upsert(
    {
      dmn_id: domainId,
      dmn_title: "Mathematics",
      dmn_dscrptn: "All about numbers and equations",
      dmn_duration: 60,
    },
    { onConflict: "dmn_title" },
  );
  if (res.error) throw new Error(`[Domain.upsert] ${res.error.message}`);

  res = await admin.from("subDomain").upsert(
    {
      subdom_id: subDomainId,
      subdom_title: "Algebra",
      domainId,
    },
    { onConflict: "subdom_title" },
  );
  if (res.error) throw new Error(`[subDomain.upsert] ${res.error.message}`);

  res = await admin.from("Course").upsert(
    {
      crs_id: "course-seed-intro-math",
      crs_title: "Introduction to Mathematics",
      crs_type: "pdf",
      pdf_file: "math101.pdf",
      teacherId,
      subdom: subDomainId,
    },
    { onConflict: "crs_title" },
  );
  if (res.error) throw new Error(`[Course.upsert] ${res.error.message}`);
}

async function main() {
  console.log("Seeding Supabase...");

  await upsertAuthUser(
    seed.teacherEmail,
    seed.teacherPassword,
    "teacher",
    "John Doe",
  );
  await upsertAuthUser(
    seed.studentEmail,
    seed.studentPassword,
    "student",
    "Jane Smith",
  );
  await upsertAuthUser(seed.adminEmail, seed.adminPassword, "admin", "Admin User");

  await seedRelationalData();

  console.log("Seed completed.");
}

main().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
