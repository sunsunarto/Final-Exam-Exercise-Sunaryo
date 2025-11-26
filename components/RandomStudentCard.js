import { useEffect, useState } from "react";
import { Card, Avatar, Skeleton } from "antd";

export default function RandomStudentCard() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("/api/random-student");
        if (active) {
          if (res.ok) {
            const data = await res.json();
            setStudent(data);
          }
        }
      } catch {
        // ignore
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  return (
    <Card title="Random Student of the Day" style={{ maxWidth: 420 }}>
      <Skeleton loading={loading} avatar active>
        {student ? (
          <>
            <Avatar src={student.image} size={64} />
            <div style={{ marginTop: 12 }}>
              <div>{student.firstName} {student.lastName}</div>
              <div style={{ color: "gray" }}>{student.email}</div>
            </div>
          </>
        ) : (
          <div>No student available.</div>
        )}
      </Skeleton>
    </Card>
  );
}
