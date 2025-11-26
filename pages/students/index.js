import { Typography, Card } from "antd";
import StudentTable from "../../components/StudentTable";
import { fetchStudents, fetchMajors } from "../../lib/api";
import { enrichStudentsWithMajors } from "../../lib/utils";
import { useAppContext } from "../../context/AppContext";

export default function StudentsPage({ initialStudents, majors }) {
  const { selectedMajor } = useAppContext();

  return (
    <>
      <Typography.Title level={2}>Students</Typography.Title>
      <Card>
        <StudentTable
          students={initialStudents}
          majors={majors}
          defaultMajor={selectedMajor}
        />
      </Card>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const [students, majors] = await Promise.all([
      fetchStudents({ limit: 100 }),
      fetchMajors()
    ]);
    const enriched = enrichStudentsWithMajors(students, majors);
    return { props: { initialStudents: enriched, majors } };
  } catch (e) {
    return { props: { initialStudents: [], majors: [] } };
  }
}
